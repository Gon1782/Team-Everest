import { useRecoilValue } from 'recoil';
import { getDate } from '@/common/utils/getDate';
import { postReview, updateReview } from '@/common/api/reviewApi';
import { getUserDB, updateUserDB } from '@/common/api/userApi';
import { uuidv4 } from '@firebase/util';
import { DetailList } from '@/recoil/atom/Detail';

const useAddReview = (
  text: string,
  rating: number,
  image: string[],
  title: string,
  contentId: string,
  reset: () => void,
  closeModal: () => void,
) => {
  const list = useRecoilValue(DetailList);
  // 로그인 여부 확인
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';

  // 시간
  const [date, time] = getDate();

  const addReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newReview = {
      rating,
      content: text,
      createdAt: `${date} ${time}`,
      id: uuidv4(),
      image,
      title,
      contentId,
      uid,
      isDelete: 'N',
    };
    const newReviewData = {
      ratingCount: !!list.ratingCount ? list.ratingCount + 1 : 1,
      review: !!list.review ? [...list?.review, newReview] : [newReview],
      totalRating: !!list.totalRating ? list.totalRating + rating : rating,
    };
    closeModal();
    // 첫 리뷰 일때 setDoc 두번째 리뷰부터 업데이트
    if (!list.review) await postReview(contentId, newReviewData);
    else await updateReview(contentId, newReviewData);

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
