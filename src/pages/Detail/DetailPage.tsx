import { useCallback, useEffect, useState } from 'react';
import { useQueries, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetail, getDetailIntro } from '@/common/api/tourApi';
import Error from '@/components/common/Error';
import DetailInfo from '@/components/Detail/DetailInfo';
import ReviewModal from '@/components/Detail/Review/ReviewModal';
import Review from '@/components/Detail/Review/Review';
import SimilarLandmark from '@/components/Detail/Landmark/SimilarLandmark';
import useModal from '@/hooks/useModal';
import { DetailList } from '@/recoil/atom/Detail';
import * as S from './style/DetailStyled';
import { getReview } from '@/common/api/reviewApi';
import { reviewsForm } from '@/common/utils/forms';
import { getUserInfo } from '@/common/api/plannerApi';

const DetailPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  // uid
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';

  // 리뷰 등록 모달
  const [modal, openModal, closeModal, closeModalIfClickOutside] = useModal();

  //위시리스트 데이터
  const [wishList, setWishList] = useState([]);

  const modalOpen = () => {
    if (!uid) {
      alert('로그인 후 이용해주세요');
      navigate('/login');
      return;
    }
    openModal();
  };

  // 리뷰 불러오기
  const setList = useSetRecoilState(DetailList);

  const getReviews = async () => {
    if (!!id) {
      await getReview(id)
        .then((res = reviewsForm) => setList(res))
        .catch((error) => console.log(error.message));
    }
  };

  const getWishList = async () => {
    if (!!uid) {
      await getUserInfo(uid)
        .then((res: any) => setWishList(res['myWishPlace']))
        .catch((error) => console.log(error.message));
    }
  };

  useEffect(() => {
    getReviews();
    getWishList();
  }, [id]);

  // GET API
  const results = useQueries([
    {
      queryKey: `${id}`,
      queryFn: () => getDetail(id),
    },
    {
      queryKey: `${id}intro`,
      queryFn: () => getDetailIntro(id),
    },
  ]);

  const isLoading = results.some((result) => result.isLoading);

  const isError = results.some((result) => result.isError);

  const error = results.some((result) => result.error);

  const data = results.map((result) => result.data);

  const refetchAll = useCallback(() => {
    results.forEach((result) => result.refetch());
  }, [results]);

  useEffect(() => {
    queryClient.removeQueries([id]);
    refetchAll();
  }, [id]);

  if (isLoading)
    return (
      <div>
        <DetailInfo />
      </div>
    );
  if (isError) return <div>에러: {error}</div>;

  if (data.some((result) => !result?.response)) return <Error />;

  const detailList = !!data[0]?.response.body.items
    ? data[0].response.body.items.item[0]
    : {};
  const detailIntro = !!data[1]?.response.body.items
    ? data[1].response.body.items.item[0]
    : {};

  return (
    <S.DetailContainer>
      {modal && (
        <ReviewModal
          type="post"
          item={detailList}
          closeModal={closeModal}
          closeModalIfClickOutside={closeModalIfClickOutside}
        />
      )}
      <DetailInfo item={detailList} intro={detailIntro} wishList={wishList} />
      <S.DetailSubTitle>관광지 후기 모음</S.DetailSubTitle>
      <Review item={detailList} />
      <S.DetailBtnBox>
        <S.ReviewBtn onClick={() => modalOpen()}>후기작성하기</S.ReviewBtn>
      </S.DetailBtnBox>
      <S.DetailSubTitle>유사한 관광지 추천</S.DetailSubTitle>
      <SimilarLandmark detailList={detailList} id={id} wishList={wishList} />
    </S.DetailContainer>
  );
};

export default DetailPage;
