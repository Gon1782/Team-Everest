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

export const getAllUser = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const data: Document[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
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
    const get = await getDoc(docRef);
    return get.data();
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
