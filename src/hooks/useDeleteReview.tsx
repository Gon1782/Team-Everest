import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getReview, updateReview } from '@/common/api/reviewApi';
import { getUserDB, updateUserDB } from '@/common/api/userApi';
import { DetailList } from '@/recoil/atom/Detail';
import { EachReview } from '@/types/DetailType';
import { getCities, updateCities } from '@/common/api/cityApi';
import { reviewsForm } from '@/common/utils/forms';

const useDeleteReview = (id: string, closeModal: () => void) => {
  const [list, setList] = useRecoilState(DetailList);
  const reviews = list.review;
  const review = reviews.filter((review) => review.id === id)[0];

  const getReviews = async () => {
    await getReview(review.contentId)
      .then((res = reviewsForm) => setList(res))
      .catch((error) => console.log(error.message));
  };

  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';

  const [tagCount, setTagCount] = useState(list.tagCount);

  const tagMinus = useCallback(() => {
    let tags = [...tagCount];
    for (let i = 0; i < review.tag.length; i++) {
      tags = tags.map((x) => {
        if (x.name === review.tag[i]) {
          return { ...x, count: x.count - 1 };
        } else {
          return x;
        }
      });
    }
    return tags;
  }, []);

  useEffect(() => {
    setTagCount(tagMinus());
  }, []);

  const deleteReview = async () => {
    if (uid !== review.uid)
      return alert('다른 사람의 게시글을 삭제할 수 없습니다.');
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
      ...list,
      ratingCount,
      review: newReviews,
      totalRating,
      tagCount,
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
    getReviews();
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
