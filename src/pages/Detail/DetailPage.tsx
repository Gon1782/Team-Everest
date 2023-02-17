import { useEffect } from 'react';
import { useQueries } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { getDetail, getDetailIntro } from '@/common/api/detailApi';
import { db } from '@/common/api/firebase';
import DetailInfo from '@/components/Detail/DetailInfo';
import Review from '@/components/Review/Review';
import ReviewModal from '@/components/Review/ReviewModal';
import SimilarLandmark from '@/components/Detail/SimilarLandmark';
import { DetailList } from '@/recoil/atom/Detail';
import { reviewModalState } from '@/recoil/atom/ReviewModal';
import { category } from '@/common/utils/cat3';
import * as S from './style/DetailStyled';

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // uid
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';

  // 리뷰 등록 모달
  const [modal, setModal] = useRecoilState(reviewModalState);

  const modalOpen = () => {
    if (!uid) {
      alert('로그인 후 이용해주세요');
      navigate('/login');
      return;
    }
    setModal(true);
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
  }, []);

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

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러: {error}</div>;

  const detailList = !!data[0] ? data[0].response.body.items.item[0] : {};
  const detailIntro = !!data[1] ? data[1].response.body.items.item[0] : {};
  const cat = !!detailList?.cat3 ? detailList?.cat3 : 'A01010100';
  const pageNo = Math.floor(Math.random() * (category[cat] + 1));

  return (
    <S.DetailContainer>
      {modal && <ReviewModal title={detailList?.title} id={id} />}
      <DetailInfo item={detailList} intro={detailIntro} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          margin: '2rem 0',
          fontSize: '3rem',
          fontWeight: 'bold',
        }}
      >
        관광지 후기 모음
      </div>
      <S.WriteReview>
        <span>별점과 후기를 남겨주세요</span>
        <S.ReviewBtn onClick={() => modalOpen()}>후기작성하기</S.ReviewBtn>
      </S.WriteReview>
      <Review />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          margin: '2rem 0',
          fontSize: '3rem',
          fontWeight: 'bold',
        }}
      >
        유사한 관광지 추천
      </div>
      <SimilarLandmark id={id} pageNo={pageNo} cat={cat} />
    </S.DetailContainer>
  );
};

export default DetailPage;
