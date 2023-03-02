import { useRecoilValue } from 'recoil';
import { DetailList } from '@/recoil/atom/Detail';
import useLoadMore from '@/hooks/useLoadMore';
import { Item } from '@/types/DetailType';
import ReviewBox from './ReviewBox';
import * as S from './style/ReviewStyled';
import NoReview from './NoReview';

interface Props {
  item: Item;
}

const Review = ({ item }: Props) => {
  const list = useRecoilValue(DetailList);
  const reviews = !!list.review
    ? [...list.review]?.filter((review) => review.isDelete === 'N').reverse()
    : [];

  // 더보기
  const [idx, checkEnd, loadMore] = useLoadMore(reviews);

  return (
    <S.ReviewSection>
      <S.ReviewContainer>
        {!!reviews.length ? (
          reviews?.map((review, i) => {
            if (i <= idx)
              return <ReviewBox item={item} review={review} key={review.id} />;
          })
        ) : (
          <NoReview />
        )}
      </S.ReviewContainer>
      {/* <S.LoadMoreBox style={{ visibility: checkEnd ? 'hidden' : 'visible' }}>
        <S.LoadMore onClick={() => loadMore()}>더보기</S.LoadMore>
      </S.LoadMoreBox> */}
    </S.ReviewSection>
  );
};

export default Review;
