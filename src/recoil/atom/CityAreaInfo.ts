import React from 'react';
import { atom } from 'recoil';

export interface InfoType {
  areacode: string;
  engarea: string;
  korarea: string;
  description: string;
  hashtag: string[];
  tourcount: string;
  tourdate: string;
  spec: string;
  jpgindex: number;
}

export const CityAreaInfo = atom({
  key: 'cityAreaInfo',
  default: <InfoType>{
    areacode: '',
    engarea: '',
    korarea: '',
    description: '',
    hashtag: [],
    tourcount: '',
    tourdate: '',
    spec: '',
    jpgindex: 0,
  },
});
