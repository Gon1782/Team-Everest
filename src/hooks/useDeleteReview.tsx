import { useRecoilValue } from 'recoil';
import { updateReview } from '@/common/api/reviewApi';
import { getUserDB, updateUserDB } from '@/common/api/userApi';
import { DetailList } from '@/recoil/atom/Detail';
import { EachReview } from '@/types/DetailType';
import { getCities, updateCities } from '@/common/api/cityApi';

const useDeleteReview = (id: string, closeModal: () => void) => {
  const list = useRecoilValue(DetailList);
  const reviews = list.review;
  const review = reviews.filter((review) => review.id === id)[0];

  const deleteReview = async () => {
    const user = await getUserDB(review.uid);
    const myReviews = user?.MyReview;

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
    const city = await getCities(list.areacode, list.sigungucode);
    if (!!city)
      await updateCities(city.engarea, {
        reviewCount: `${Number(city.reviewCount) - 1}`,
      });
  };

  return deleteReview;
};

export default useDeleteReview;
