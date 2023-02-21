import React from 'react';
import { atom } from 'recoil';

export const CityArea = atom({
  key: 'cityArea',
  default: { mapy: 0, mapx: 0 },
});
