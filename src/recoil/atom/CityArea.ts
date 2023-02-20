import React from 'react';
import { atom } from 'recoil';

export const CityArea = atom<string>({
  key: 'cityArea',
  default: '',
});
