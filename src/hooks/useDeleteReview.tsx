import { useRecoilValue } from 'recoil';
import { updateReview } from '@/common/api/reviewApi';
import { updateUserDB } from '@/common/api/userApi';
import { DetailList } from '@/recoil/atom/Detail';
import { Document, EachReview } from '@/types/DetailType';

const useDeleteReview = (
  id: string,
  closeModal: () => void,
  user?: Document,
) => {
  const list = useRecoilValue(DetailList);
  const reviews = list.review;
  const review = reviews.filter((review) => review.id === id)[0];
  const myReviews = user?.MyReview;

  const deleteReview = async () => {
    const ratingCount = list.ratingCount - 1;
    const totalRating = list.totalRating - review.rating;
    const newReviews = reviews.map((review) => {
      if (review.id === id) {
        return { ...review, isDelete: 'Y' };
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
      if (review.id === id) {
        return { ...review, isDelete: 'Y' };
      } else {
        return review;
      }
    });

    closeModal();
    await updateReview(review.contentId, newList);
    await updateUserDB(review.uid, { ...user, MyReview: newMyReviews });
  };

  return deleteReview;
};

export default useDeleteReview;
