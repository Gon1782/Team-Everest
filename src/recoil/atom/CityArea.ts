import React from 'react';
import { atom } from 'recoil';

export const CityArea = atom({
  key: 'cityArea',
  default: { mapy: 37, mapx: 127, level: 13, areacode: '' },
});
