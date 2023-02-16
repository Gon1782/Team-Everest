import { useEffect } from 'react';
import { useQueries } from 'react-query';
import { useRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { getDetail, getDetailIntro } from '@/common/api/detailApi';
import { db } from '@/common/api/firebase';
import DetailInfo from '@/components/Detail/DetailInfo';
import Review from '@/components/Review/Review';
import ReviewModal from '@/components/Review/ReviewModal';
import { DetailList } from '@/recoil/atom/Detail';
import { reviewModalState } from '@/recoil/atom/ReviewModal';
import { DetailResponse, Document, EachReview } from '@/types/DetailType';
import * as S from './style/DetailStyled';

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const uid = !!sessionStorage.getItem(sessionKey)
    ? JSON.parse(sessionStorage.getItem(sessionKey)).uid
    : '';
  const [list, setList] = useRecoilState<Document>(DetailList);
  const [modal, setModal] = useRecoilState(reviewModalState);

  const modalOpen = () => {
    if (!uid) {
      alert('로그인 후 이용해주세요');
      navigate('/login');
      return;
    }
    setModal(true);
  };

  useEffect(() => {
    onSnapshot(doc(db, 'reviews', `${id}`), (doc) => {
      const newList = {
        ...doc.data(),
      };
      setList(newList);
    });
  }, []);

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

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러: {error}</div>;

  console.log(data[1]);

  return (
    <S.DetailContainer>
      {modal && (
        <ReviewModal
          title={data[0]?.response.body.items.item[0].title ?? ''}
          id={id ?? ''}
        />
      )}
      <DetailInfo
        item={data[0]?.response.body.items.item[0]}
        intro={data[1]?.response.body.items.item[0]}
      />
      <S.WriteReview>
        <span>별점과 후기를 남겨주세요</span>
        <S.ReviewBtn onClick={() => modalOpen()}>후기작성하기</S.ReviewBtn>
      </S.WriteReview>
      <Review
        review={list?.review?.filter((x: EachReview) => x.isDelete === 'N')}
      />
    </S.DetailContainer>
  );
};

export default DetailPage;
