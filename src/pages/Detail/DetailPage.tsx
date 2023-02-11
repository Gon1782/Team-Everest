import DetailInfo from '@/components/Detail/DetailInfo';
import Review from '@/components/Detail/Review/Review';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getDetail } from '@/common/api/detailApi';
import { useEffect } from 'react';
import { db } from '@/common/api/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import ReviewModal from '@/components/Detail/Review/ReviewModal';
import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/atom/modal';
import { DetailList } from '@/recoil/atom/Detail';
import * as S from './DetailStyled';
import { DetailResponse } from '@/types/DetailType';

const DetailPage = () => {
  const { id } = useParams();
  const [list, setList] = useRecoilState<any>(DetailList);
  const [modal, setModal] = useRecoilState(modalState);

  useEffect(() => {
    onSnapshot(doc(db, 'reviews', `${id}`), (doc) => {
      const newList = {
        ...doc.data(),
      };
      setList(newList);
    });
  }, []);

  const { isLoading, isError, data, error } = useQuery<DetailResponse, Error>(
    `${id}`,
    () => getDetail(id),
  );
  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러: {error.message}</div>;

  return (
    <S.DetailContainer>
      {modal && (
        <ReviewModal
          title={data?.response.body.items.item[0].title ?? ''}
          id={id ?? ''}
        />
      )}
      <DetailInfo item={data?.response.body.items.item[0]} />
      <S.WriteReview>
        <span>별점과 후기를 남겨주세요</span>
        <S.ReviewBtn onClick={() => setModal(true)}>후기작성하기</S.ReviewBtn>
      </S.WriteReview>
      <Review review={list?.review} />
    </S.DetailContainer>
  );
};

export default DetailPage;
