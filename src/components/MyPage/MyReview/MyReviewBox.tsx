import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getDetail } from '@/common/api/tourApi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { DetailResponse, EachReview } from '@/types/DetailType';
import { ReviewImage } from '@/components/Detail/Review/style/ReviewStyled';
import * as S from './style/MyReviewStyled';
import Error from '@/components/common/Error';

interface Props {
  review: EachReview;
}

const MyReviewBox = ({ review }: Props) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/detail/${review.contentId}`);
  };

  const rating = [false, false, false, false, false].map((_, i) =>
    i < review.rating ? true : false,
  );

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

  if (!data?.response) return <Error />;

  const title = data?.response.body.items.item[0].title;

  return (
    <S.MyReview onClick={() => goToDetail()}>
      <S.MyReviewInfoBox>
        <span>{title}</span>
        <S.MyReviewRatingBox>
          {rating.map((x, i) =>
            x ? (
              <FaStar color="#0039CB" size={24} key={i} />
            ) : (
              <FaRegStar color="#0039CB" size={24} key={i} />
            ),
          )}
        </S.MyReviewRatingBox>
        <S.MyReviewContentBox>
          {review.content.length <= 85
            ? review.content
            : `${review.content.slice(0, 85)}...`}
        </S.MyReviewContentBox>
        <S.MyImageBox>
          {review.image.map((image: string, i: number) => {
            return <ReviewImage src={image} key={i} alt="review" />;
          })}
        </S.MyImageBox>
      </S.MyReviewInfoBox>
    </S.MyReview>
  );
};

export default MyReviewBox;
