import { Document } from '@/types/DetailType';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const postReview = async (id: string, newReviewData: Document) => {
  try {
    await setDoc(doc(db, 'reviews', id), newReviewData);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateReview = async (id: string, newReviewData: Document) => {
  try {
    await updateDoc(doc(db, 'reviews', id), newReviewData);
  } catch (error) {
    console.log(error.message);
  }
};
