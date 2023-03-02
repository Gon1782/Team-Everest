import { useState, useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { updateReview } from '@/common/api/reviewApi';
import { getUserDB, updateUserDB } from '@/common/api/userApi';
import { DetailList } from '@/recoil/atom/Detail';
import { EachReview } from '@/types/DetailType';
import { reviewForm } from '@/common/utils/forms';

const useEditReview = (
  type: string,
  reviewId: string,
  rating: number,
  content: string,
  image: string[],
  tag: string[],
  reset: () => void,
  closeModal: () => void,
) => {
  // 리뷰
  const list = useRecoilValue(DetailList);
  const reviews = list.review;
  const review = !!reviews
    ? reviews.filter((review) => review.id === reviewId)[0]
    : reviewForm;

  // UID
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';
  const [newTags, setNewTags] = useState(list.tagCount);
  const [existingTags, setExistingTags] = useState(tag);

  if (type === 'edit') {
    //태그 카운팅

    const tagAdd = useCallback(() => {
      for (let i = 0; i < tag.length; i++) {
        const tags = newTags.map((x) => {
          if (x.name === tag[i]) {
            return { ...x, count: x.count + 1 };
          } else {
            return x;
          }
        });
        setNewTags(tags);
        setExistingTags(tag);
      }
    }, [tag]);

    const tagMinus = useCallback(() => {
      const removeTag = existingTags.filter((x) => !tag.includes(x));
      for (let i = 0; i < removeTag.length; i++) {
        const tags = newTags.map((x) => {
          if (x.name === removeTag[i]) {
            return { ...x, count: x.count - 1 };
          } else {
            return x;
          }
        });
        setNewTags(tags);
        setExistingTags(tag);
      }
    }, [tag]);

    useEffect(() => {
      if (existingTags.length < tag.length) {
        tagAdd();
      } else if (existingTags.length > tag.length) {
        tagMinus();
      }
    }, [tag]);
  }

  // 리뷰 수정
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
      tagCount: newTags,
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
