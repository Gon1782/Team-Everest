import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { DetailList } from '@/recoil/atom/Detail';
import ReviewBox from './ReviewBox';
import * as S from './style/ReviewStyled';

const Review = () => {
  const list = useRecoilValue(DetailList);
  const reviews = !!list.review
    ? [...list.review]?.filter((review) => review.isDelete === 'N').reverse()
    : [];

  // 더보기
  const [idx, setIdx] = useState(2);

  const checkEnd = !!reviews ? reviews.length - 1 <= idx : true;

  const loadMore = () => {
    if (!checkEnd) {
      setIdx(idx + 3);
    }
  };

  return (
    <S.ReviewSection>
      <S.ReviewContainer>
        {reviews?.map((review, i) => {
          if (i <= idx) return <ReviewBox review={review} key={review.id} />;
        })}
      </S.ReviewContainer>
      <S.LoadMoreBox style={{ visibility: checkEnd ? 'hidden' : 'visible' }}>
        <S.LoadMore onClick={() => loadMore()}>더보기</S.LoadMore>
      </S.LoadMoreBox>
    </S.ReviewSection>
  );
};

export default Review;
