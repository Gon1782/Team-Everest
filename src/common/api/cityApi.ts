import { Document } from '@/types/DetailType';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

export const getCities = async (areaCode: string, sigunguCode: string) => {
  try {
    const q = !!sigunguCode
      ? query(
          collection(db, 'cities'),
          where('areaCode', '==', areaCode),
          where('sigunguCode', '==', sigunguCode),
        )
      : query(collection(db, 'cities'), where('areaCode', '==', areaCode));
    const data: Document[] = [];
    const get = await getDocs(q);
    get.forEach((doc) => {
      data.push(doc.data());
    });
    return data[0];
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const postCities = async (city: string, Data: Document) => {
  try {
    await setDoc(doc(db, 'cities', city), Data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const updateCities = async (city: string, Data: Document) => {
  try {
    await updateDoc(doc(db, 'cities', city), Data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
