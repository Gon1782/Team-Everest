import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { Document } from '@/types/DetailType';
import { UserData } from '@/types/UserType';

export const getAllUser = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const data: UserData[] = [];
    querySnapshot.forEach((doc) => {
      data.push({
        uid: doc.data().uid,
        email: doc.data().email,
        photoURL: doc.data().photoURL,
        displayName: doc.data().displayName,
        introduce: doc.data().introduce,
        backImage: doc.data().backImage,
        myWishPlace: doc.data().myWishPlace,
        myPlanner: doc.data().myPlanner,
        MyReview: doc.data().MyReview,
      });
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const getUserDB = async (uid: string) => {
  try {
    const docRef = doc(db, 'users', uid);
    const data = await getDoc(docRef);
    return {
      uid: data.data()?.uid,
      email: data.data()?.email,
      photoURL: data.data()?.photoURL,
      displayName: data.data()?.displayName,
      introduce: data.data()?.introduce,
      backImage: data.data()?.backImage,
      myWishPlace: data.data()?.myWishPlace,
      myPlanner: data.data()?.myPlanner,
      MyReview: data.data()?.MyReview,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const postUserDB = async (uid: string, newData: Document) => {
  try {
    await setDoc(doc(db, 'users', uid), newData);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const updateUserDB = async (uid: string, edit: Document) => {
  try {
    await updateDoc(doc(db, 'users', uid), edit);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
