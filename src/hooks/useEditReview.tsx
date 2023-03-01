import { useRecoilValue } from 'recoil';
import { updateReview } from '@/common/api/reviewApi';
import { getUserDB, updateUserDB } from '@/common/api/userApi';
import { DetailList } from '@/recoil/atom/Detail';
import { EachReview } from '@/types/DetailType';
import { reviewForm } from '@/common/utils/forms';

const useEditReview = (
  reviewId: string,
  rating: number,
  content: string,
  image: string[],
  tag: string[],
  reset: () => void,
  closeModal: () => void,
) => {
  const list = useRecoilValue(DetailList);
  const reviews = list.review;
  const review = !!reviews
    ? reviews.filter((review) => review.id === reviewId)[0]
    : reviewForm;

  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';

  const editReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (uid !== review.uid)
      return alert('다른 사람의 게시글을 수정할 수 없습니다.');
    if (!content) return alert('리뷰 내용을 입력해주세요.');
    if (!rating) return alert('별점을 등록해 주세요.');
    if (content.length > 500) return alert('500자 미만으로 작성해주세요');

    const user = await getUserDB(review.uid);
    const myReviews = user?.MyReview;

    const totalRating = list.totalRating - review.rating + rating;
    const newReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        return { ...review, rating, content, image, tag };
      } else {
        return review;
      }
    });
    const newList = {
      ...list,
      review: newReviews,
      totalRating,
    };
    const newMyReviews = myReviews.map((review: EachReview) => {
      if (review.id === reviewId) {
        return { ...review, rating, content, image, tag };
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
