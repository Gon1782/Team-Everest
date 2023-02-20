import { atom } from 'recoil';
import { locationData, themeData } from '@/common/api/categoryApi';
// 현재 작업중인 일정 폴더
export const area = atom({
  key: 'area',
  default: <any>[],
});

// 테마 데이터 가져오기
export const themeService = atom({
  key: 'themeService',
  default: <any>[],
  effects: [
    ({ setSelf }: any) => {
      themeData().then((result) => {
        setSelf(result);
      });
    },
  ],
});

// 도시 데이터 가져오기
export const locationService = atom({
  key: 'locationService',
  default: <any>[],
  effects: [
    ({ setSelf }: any) => {
      locationData().then((result) => {
        setSelf(result);
      });
    },
  ],
});
