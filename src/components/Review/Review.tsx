import { useRecoilValue } from 'recoil';
import { DetailList } from '@/recoil/atom/Detail';
import ReviewBox from './ReviewBox';
import * as S from './style/ReviewStyled';

const Review = () => {
  const list = useRecoilValue(DetailList);
  const review = list?.review?.filter((x) => x.isDelete === 'N');

  return (
    <S.ReviewSection>
      <S.ReviewContainer>
        {review?.map((x) => {
          return <ReviewBox review={x} key={x.id} />;
        })}
      </S.ReviewContainer>
    </S.ReviewSection>
  );
};

export default Review;
