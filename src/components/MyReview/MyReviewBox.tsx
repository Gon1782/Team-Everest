import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getDetail } from '@/common/api/detailApi';
import { DetailResponse, Document, EachReview } from '@/types/DetailType';
import { Image } from '../Review/style/ReviewStyled';
import * as S from './style/MyReviewStyled';

interface Props {
  user: Document;
  review?: EachReview;
}

const MyReviewBox = ({ user, review }: Props) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/detail/${review.contentId}`);
  };

  const { isLoading, isError, data, error } = useQuery<DetailResponse, Error>(
    `${review.contentId}`,
    () => getDetail(review.contentId),
  );
  if (isLoading)
    return (
      <S.MyReview>
        <S.MyReviewHeader>
          <S.MyReviewProfile src={user?.photoURL} />
          <span>{user?.displayName}</span>
        </S.MyReviewHeader>
        <S.MyReviewInfoBox>
          <span>장소명</span>
          <S.MyReviewRatingBox>⭐⭐⭐⭐⭐</S.MyReviewRatingBox>
          <S.MyReviewContentBox>
            내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
          </S.MyReviewContentBox>
          <S.MyImageBox>
            <Image
              src={
                'https://images.unsplash.com/photo-1675845626595-a50d669f26cb?ixl'
              }
            />
          </S.MyImageBox>
        </S.MyReviewInfoBox>
      </S.MyReview>
    );
  if (isError) return <div>에러: {error.message}</div>;

  const title = data.response.body.items.item[0].title;

  return (
    <S.MyReview onClick={() => goToDetail()}>
      <S.MyReviewHeader>
        <S.MyReviewProfile src={user?.photoURL} />
        <span>{user?.displayName}</span>
      </S.MyReviewHeader>
      <S.MyReviewInfoBox>
        <span>{title}</span>
        <S.MyReviewRatingBox>
          {'⭐'.repeat(Number(review.rating))}
        </S.MyReviewRatingBox>
        <S.MyReviewContentBox>
          {review.content.length <= 85
            ? review.content
            : `${review.content.slice(0, 85)}...`}
        </S.MyReviewContentBox>
        <S.MyImageBox>
          {review.image.map((x: string, i: number) => {
            return <Image src={x} key={i} />;
          })}
        </S.MyImageBox>
      </S.MyReviewInfoBox>
    </S.MyReview>
  );
};

export default MyReviewBox;
