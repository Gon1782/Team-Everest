import useLoadMore from '@/hooks/useLoadMore';
import { EachReview } from '@/types/DetailType';
import { UserData } from '@/types/UserType';
import MyReviewBox from './MyReviewBox';
import * as S from './style/MyReviewStyled';

interface Props {
  user: UserData;
}

const MyReview = ({ user }: Props) => {
  const myReview = user.MyReview?.filter(
    (review: EachReview) => review.isDelete === 'N',
  );
  const [idx, checkEnd, loadMore] = useLoadMore(myReview, 2);
  const checkMyReview = !!myReview?.length;

  return (
    <S.MyReviewSection>
      <S.MyReviewHeader>
        <S.MyReviewTitle>나의 리뷰 리스트</S.MyReviewTitle>
        <S.MyReviewLoadMore
          style={{ visibility: checkEnd ? 'hidden' : 'visible' }}
          onClick={() => loadMore()}
        >
          더보기
        </S.MyReviewLoadMore>
      </S.MyReviewHeader>
      <S.MyReviewContainer>
        {checkMyReview ? (
          myReview.map((review: EachReview, i: number) => {
            if (i <= idx)
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
