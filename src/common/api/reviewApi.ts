import { Document, Reviews } from '@/types/DetailType';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const getReview = async (id: string) => {
  try {
    const docRef = doc(db, 'reviews', id);
    const get = await getDoc(docRef);
    const reviews: Reviews = {
      ratingCount: get.data()?.ratingCount,
      review: get.data()?.review,
      tagCount: get.data()?.tagCount,
      totalRating: get.data()?.totalRating,
      areacode: get.data()?.areacode,
      sigungucode: get.data()?.sigungucode,
    };
    return reviews;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const postReview = async (id: string, newReviewData: Document) => {
  try {
    await setDoc(doc(db, 'reviews', id), newReviewData);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const updateReview = async (id: string, newReviewData: Document) => {
  try {
    await updateDoc(doc(db, 'reviews', id), newReviewData);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
