import { useRecoilValue } from 'recoil';
import { updateReview } from '@/common/api/reviewApi';
import { updateUserDB } from '@/common/api/userApi';
import { DetailList } from '@/recoil/atom/Detail';
import { Document, EachReview } from '@/types/DetailType';

const useEditReview = (
  reviewId: string,
  rating: number,
  content: string,
  image: string[],
  reset: () => void,
  closeModal: () => void,
  user?: Document,
) => {
  const list = useRecoilValue(DetailList);
  const reviews = list.review;
  const review = reviews.filter((review) => review.id === reviewId)[0];
  const myReviews = user?.MyReview;

  const editReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ratingCount = list.ratingCount;
    const totalRating = list.totalRating - review.rating + rating;
    const newReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        return { ...review, rating, content, image };
      } else {
        return review;
      }
    });
    const newList = {
      ratingCount,
      review: newReviews,
      totalRating,
    };
    const newMyReviews = myReviews.map((review: EachReview) => {
      if (review.id === reviewId) {
        return { ...review, rating, content, image };
      } else {
        return review;
      }
    });

    closeModal();
    await updateReview(review.contentId, newList);
    await updateUserDB(review.uid, { ...user, MyReview: newMyReviews });
    reset();
  };

  return editReview;
};

export default useEditReview;
