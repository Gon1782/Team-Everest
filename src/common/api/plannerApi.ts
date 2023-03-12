import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';

export const getAllPlanner = async () => {
  const docRef = doc(db, 'planners', 'list');
  const data = await getDoc(docRef);
  return data.data();
};

export const getUserInfo = async (uid: string) => {
  const docRef = doc(db, 'users', uid);
  const data = await getDoc(docRef);
  return data.data();
};

export const updateAllPlannerDB = async (newAllPlanner: any) => {
  await updateDoc(doc(db, 'planners', 'list'), {
    items: [...newAllPlanner],
  });
};

export const updateUserDB = async (newMyPlanner: any, uid: string) => {
  await updateDoc(doc(db, 'users', uid), {
    myPlanner: newMyPlanner,
  });
};
