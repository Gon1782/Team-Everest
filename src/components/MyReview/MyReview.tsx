import { Document, EachReview } from '@/types/DetailType';
import MyReviewBox from './MyReviewBox';
import * as S from './style/MyReviewStyled';

interface Props {
  user: Document;
}

const MyReview = ({ user }: Props) => {
  return (
    <S.MyReviewSection>
      <S.MyReviewTitle>나의 리뷰 리스트</S.MyReviewTitle>
      <S.MyReviewContainer>
        {!!user?.MyReview.length ? (
          user.MyReview.filter((x: EachReview) => x.isDelete === 'N').map(
            (x: EachReview) => {
              return <MyReviewBox user={user} review={x} key={x.id} />;
            },
          )
        ) : (
          <S.MyReviewNone>아직 작성한 리뷰가 없어요 ㅠㅠ</S.MyReviewNone>
        )}
      </S.MyReviewContainer>
    </S.MyReviewSection>
  );
};

export default MyReview;
