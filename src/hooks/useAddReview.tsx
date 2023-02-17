import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getDate } from '@/common/utils/getDate';
import { postReview, updateReview } from '@/common/api/reviewApi';
import { getUserDB, updateUserDB } from '@/common/api/userApi';
import { uuidv4 } from '@firebase/util';
import { DetailList } from '@/recoil/atom/Detail';
import { reviewModalState } from '@/recoil/atom/ReviewModal';

const useAddReview = (
  text: string,
  rating: number,
  image: string[],
  contentId: string,
  uid: string,
  reset: () => void,
) => {
  const list = useRecoilValue(DetailList);

  // 시간
  const [date, time] = getDate();

  // 모달
  const setModal = useSetRecoilState(reviewModalState);

  const addReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newReview = {
      rating,
      content: text,
      createdAt: `${date} ${time}`,
      id: uuidv4(),
      image,
      contentId,
      uid,
      isDelete: 'N',
    };
    const newReviewData = {
      ratingCount: !!list.ratingCount ? list.ratingCount + 1 : 1,
      review: !!list.review ? [...list?.review, newReview] : [newReview],
      totalRating: !!list.totalRating ? list.totalRating + rating : rating,
    };
    // 첫 리뷰 일때 setDoc 두번째 리뷰부터 업데이트
    if (!list.review) await postReview(contentId, newReviewData);
    else await updateReview(contentId, newReviewData);
    setModal(false);

    // UserDB update
    const user = await getUserDB(uid);
    await updateUserDB(uid, {
      MyReview: !!user?.MyReview ? [...user?.MyReview, newReview] : [newReview],
    });
    reset();
  };

  return addReview;
};

export default useAddReview;
