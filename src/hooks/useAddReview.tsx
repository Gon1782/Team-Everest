import { useEffect, useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { getDate } from '@/common/utils/getDate';
import { getReview, postReview, updateReview } from '@/common/api/reviewApi';
import { getUserDB, updateUserDB } from '@/common/api/userApi';
import { uuidv4 } from '@firebase/util';
import { DetailList } from '@/recoil/atom/Detail';
import { getCities, updateCities } from '@/common/api/cityApi';
import { reviewsForm } from '@/common/utils/forms';
import { storage } from '@/common/api/firebase';
import { ref, uploadString, getDownloadURL } from '@firebase/storage';

const useAddReview = (
  areacode: string,
  sigungucode: string,
  content: string,
  rating: number,
  image: string[],
  contentId: string,
  tag: string[],
  tags: string[],
  reset: () => void,
  closeModal: () => void,
) => {
  const [list, setList] = useRecoilState(DetailList);
  // 로그인 여부 확인
  const sessionKey = `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`;
  const userItem = sessionStorage.getItem(sessionKey);
  const uid = !!userItem ? JSON.parse(userItem).uid : '';

  // 시간
  const [date, time] = getDate();

  const getReviews = async () => {
    await getReview(contentId)
      .then((res = reviewsForm) => setList(res))
      .catch((error) => console.log(error.message));
  };

  // 태그 카운팅
  const [newTags, setNewTags] = useState(list.tagCount);
  const [existingTags, setExistingTags] = useState(tag);

  useEffect(() => {
    if (!list.tagCount) {
      const newTag = [];
      for (let i = 0; i < tags.length; i++) {
        const tag = { name: tags[i], count: 0 };
        newTag.push(tag);
      }
      setNewTags(newTag);
    }
  }, [list]);

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

  const uploadImage = async (images: string[]) => {
    const uploadedImage: string[] = [];
    for (const image of images) {
      const imgRef = ref(storage, `image/${contentId}/${uuidv4()}`);
      const response = await uploadString(imgRef, image, 'data_url');
      const downloadUrl = await getDownloadURL(response.ref);
      uploadedImage.push(downloadUrl);
    }
    return uploadedImage;
  };

  const add = async (images: string[]) => {
    const newReview = {
      rating,
      content,
      createdAt: `${date} ${time}`,
      id: uuidv4(),
      image: images,
      contentId,
      tag,
      uid,
      isDelete: 'N',
    };
    const newReviewData = {
      areacode,
      sigungucode,
      ratingCount: !!list.ratingCount ? list.ratingCount + 1 : 1,
      review: !!list.review ? [...list?.review, newReview] : [newReview],
      totalRating: !!list.totalRating ? list.totalRating + rating : rating,
      tagCount: newTags,
    };
    // 첫 리뷰 일때 setDoc 두번째 리뷰부터 업데이트
    if (!list.review) await postReview(contentId, newReviewData);
    else await updateReview(contentId, newReviewData);
    getReviews();
    closeModal();

    // UserDB update
    const user = await getUserDB(uid);
    await updateUserDB(uid, {
      MyReview: !!user?.MyReview ? [...user?.MyReview, newReview] : [newReview],
    });

    const city = await getCities(areacode, sigungucode);
    const engarea = !!city ? city.engarea.split('-')[0] : '';
    if (!!city)
      await updateCities(engarea, {
        reviewCount: `${Number(city.reviewCount) + 1}`,
      });
  };

  // 리뷰 등록
  const addReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return alert('리뷰 내용을 입력해주세요.');
    if (!rating) return alert('별점을 등록해 주세요.');
    if (content.length > 500) return;
    uploadImage(image)
      .then((res) => {
        if (!!res.length) {
          add(res);
        }
      })
      .catch((error) => console.log(error.messages));
  };

  return addReview;
};

export default useAddReview;
