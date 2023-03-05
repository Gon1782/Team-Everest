import React from 'react';
import { atom } from 'recoil';

export interface InfoType {
  areacode: string;
  engarea: string;
  name: string;
  description: string;
  hashtag: string[];
  tourcount: string;
  tourdate: string;
  spec: string;
  jpgindex: number;
}

export const CityAreaInfo = atom({
  key: 'cityAreaInfo',
  default: {
    areacode: '',
    engarea: '',
    name: '',
    description: '',
    hashtag: [''],
    tourcount: '',
    tourdate: '',
    spec: '',
    jpgindex: 0,
  },
});
