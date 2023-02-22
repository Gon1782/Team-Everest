import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getDetail } from '@/common/api/detailApi';
import { DetailResponse, EachReview } from '@/types/DetailType';
import * as S from './style/MyReviewStyled';
import { ReviewImage } from '@/components/Detail/Review/style/ReviewStyled';

interface Props {
  review: EachReview;
}

const MyReviewBox = ({ review }: Props) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/detail/${review.contentId}`);
  };

  // GET 관광지
  const { isLoading, isError, data, error } = useQuery<DetailResponse, Error>(
    `${review.contentId}`,
    () => getDetail(review.contentId),
  );

  // 스켈레톤 UI
  if (isLoading)
    return (
      <S.MyReview>
        <S.MyReviewInfoBox>
          <span>장소명</span>
          <S.MyReviewRatingBox>⭐⭐⭐⭐⭐</S.MyReviewRatingBox>
          <S.MyReviewContentBox>
            내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
          </S.MyReviewContentBox>
          <S.MyImageBox>
            <ReviewImage
              src={
                'https://images.unsplash.com/photo-1675845626595-a50d669f26cb?ixl'
              }
            />
          </S.MyImageBox>
        </S.MyReviewInfoBox>
      </S.MyReview>
    );
  if (isError) return <div>에러: {error.message}</div>;

  const title = data?.response.body.items.item[0].title;

  return (
    <S.MyReview onClick={() => goToDetail()}>
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
          {review.image.map((image: string, i: number) => {
            return <ReviewImage src={image} key={i} />;
          })}
        </S.MyImageBox>
      </S.MyReviewInfoBox>
    </S.MyReview>
  );
};

export default MyReviewBox;
