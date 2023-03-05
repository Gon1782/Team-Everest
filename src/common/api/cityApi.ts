import { City } from '@/types/CityType';
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
    const data: City[] = [];
    const get = await getDocs(q);
    get.forEach((doc) => {
      data.push({
        name: doc.data().name,
        areaCode: doc.data().areaCode,
        sigunguCode: doc.data().sigunguCode,
        reviewCount: doc.data().reviewCount,
        engarea: doc.data().engarea,
        description: doc.data().description,
        hashtag: doc.data().hashtag,
        tourcount: doc.data().tourcount,
        tourdate: doc.data().tourdate,
        spec: doc.data().spec,
        mapx: doc.data().mapx,
        mapy: doc.data().mapy,
        image: doc.data().image,
      });
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
