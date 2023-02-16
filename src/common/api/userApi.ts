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
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserDB = async (uid: string) => {
  try {
    const docRef = doc(db, 'users', uid);
    const get = await getDoc(docRef);
    const data = get.data();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const postUserDB = async (uid: string, newData: Document) => {
  try {
    await setDoc(doc(db, 'users', uid), newData);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUserDB = async (uid: string, edit: Document) => {
  try {
    await updateDoc(doc(db, 'users', uid), edit);
  } catch (error) {
    console.log(error.message);
  }
};
