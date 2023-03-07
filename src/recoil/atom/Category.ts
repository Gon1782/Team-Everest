import { atom } from 'recoil';
import { locationData, themeData } from '@/common/api/categoryApi';

import cat1 from '@/common/utils/cat1';
import { areaCode } from '@/common/utils/areaCode/areaCode';

// 현재 작업중인 일정 폴더
export const area = atom({
  key: 'area',
  default: <any>[],
});

// 테마 데이터 가져오기
export const themeService = atom({
  key: 'themeService',
  default: cat1,
});

// 도시 데이터 가져오기
export const locationService = atom({
  key: 'locationService',
  default: areaCode,
});
