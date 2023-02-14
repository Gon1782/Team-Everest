import { EachReview } from '@/types/DetailType';
import ReviewBox from './ReviewBox';
import * as S from './style/ReviewStyled';

interface Props {
  review: EachReview[];
}

const Review = ({ review }: Props) => {
  return (
    <S.ReviewSection>
      <S.ReviewContainer>
        {review?.map((x: EachReview) => {
          return <ReviewBox review={x} key={x.id} />;
        })}
      </S.ReviewContainer>
    </S.ReviewSection>
  );
};

export default Review;
