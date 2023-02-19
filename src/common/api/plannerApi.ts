import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const getAllPlanner = async () => {
  const docRef = doc(db, 'planners', 'list');
  const data = await getDoc(docRef);
  return data.data();
};

export const getUserPlanList = async (uid: string) => {
  const docRef = doc(db, 'users', uid);
  const data = await getDoc(docRef);
  return data.data();
};
