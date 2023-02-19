import { Document, EachReview } from '@/types/DetailType';
import MyReviewBox from './MyReviewBox';
import * as S from './style/MyReviewStyled';

interface Props {
  user: Document;
}

const MyReview = ({ user }: Props) => {
  const checkMyReview = !!user.MyReview?.length;
  const myReview = user.MyReview?.filter(
    (review: EachReview) => review.isDelete === 'N',
  );

  return (
    <S.MyReviewSection>
      <S.MyReviewTitle>나의 리뷰 리스트</S.MyReviewTitle>
      <S.MyReviewContainer>
        {checkMyReview ? (
          myReview.map((review: EachReview) => {
            return <MyReviewBox review={review} key={review.id} />;
          })
        ) : (
          <S.MyReviewNone>아직 작성한 리뷰가 없어요 ㅠㅠ</S.MyReviewNone>
        )}
      </S.MyReviewContainer>
    </S.MyReviewSection>
  );
};

export default MyReview;
