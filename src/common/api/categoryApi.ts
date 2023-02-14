import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/common/api/firebase';

export const locationData = async () => {
  const docRef = doc(db, 'category', 'area');
  const data = await getDoc(docRef);
  const dataList = data?.data()?.items;
  return dataList;
};

export const themeData = async () => {
  const docRef = doc(db, 'category', 'kind');
  const data = await getDoc(docRef);
  const dataList = data?.data()?.item;
  return dataList;
};
