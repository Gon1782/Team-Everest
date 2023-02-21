import { useCallback, useEffect, useState } from 'react';
import { useQueries, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { getDetail, getDetailIntro } from '@/common/api/detailApi';
import { db } from '@/common/api/firebase';
import DetailInfo from '@/components/Detail/DetailInfo';
import Review from '@/components/Review/Review';
import ReviewModal from '@/components/Review/ReviewModal';
import SimilarLandmark from '@/components/Detail/SimilarLandmark';
import useModal from '@/hooks/useModal';
import { DetailList } from '@/recoil/atom/Detail';
import * as S from './style/DetailStyled';

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

  useEffect(() => {
    onSnapshot(doc(db, 'reviews', `${id}`), (doc) => {
      const newList = {
        ratingCount: doc.data()?.ratingCount,
        review: doc.data()?.review,
        totalRating: doc.data()?.totalRating,
      };
      setList(newList);
    });

    if (!!uid) {
      onSnapshot(doc(db, 'users', uid), (doc) => {
        setWishList(doc.data()?.myWishPlace);
      });
    }
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

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러: {error}</div>;

  const detailList = !!data[0]?.response.body.items
    ? data[0].response.body.items.item[0]
    : {};
  const detailIntro = !!data[1]?.response.body.items
    ? data[1].response.body.items.item[0]
    : {};
  const cat = !!detailList?.cat3 ? detailList?.cat3 : 'A01010100';

  return (
    <S.DetailContainer>
      {modal && (
        <ReviewModal
          type="post"
          id={id}
          title={detailList?.title}
          addr={detailList?.addr1}
          closeModal={closeModal}
          closeModalIfClickOutside={closeModalIfClickOutside}
        />
      )}
      <DetailInfo item={detailList} intro={detailIntro} wishList={wishList} />
      <S.DetailSubTitle>관광지 후기 모음</S.DetailSubTitle>
      <S.WriteReview>
        <span>별점과 후기를 남겨주세요</span>
        <S.ReviewBtn onClick={() => modalOpen()}>후기작성하기</S.ReviewBtn>
      </S.WriteReview>
      <Review item={detailList} />
      <S.DetailSubTitle>유사한 관광지 추천</S.DetailSubTitle>
      <SimilarLandmark cat={cat} id={id} />
    </S.DetailContainer>
  );
};

export default DetailPage;
