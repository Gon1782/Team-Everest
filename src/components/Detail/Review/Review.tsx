import { useRecoilValue } from 'recoil';
import { DetailList } from '@/recoil/atom/Detail';
import ReviewBox from './ReviewBox';
import * as S from './style/ReviewStyled';
import { Item } from '@/types/DetailType';
import useLoadMore from '@/hooks/useLoadMore';

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
        {reviews?.map((review, i) => {
          if (i <= idx)
            return <ReviewBox item={item} review={review} key={review.id} />;
        })}
      </S.ReviewContainer>
      <S.LoadMoreBox style={{ visibility: checkEnd ? 'hidden' : 'visible' }}>
        <S.LoadMore onClick={() => loadMore()}>더보기</S.LoadMore>
      </S.LoadMoreBox>
    </S.ReviewSection>
  );
};

export default Review;
