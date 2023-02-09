import { atom, selector } from 'recoil';

// 전체 일정 리스트
export const scheduleList = atom({
  key: 'scheduleList',
  default: <any>{},
});

// 현재 작업중인 일정 폴더
export const nowSchedule = atom({
  key: 'nowSchedule',
  default: <any>{},
});

// 생성한 일정 폴더 이름
export const folderName = atom({
  key: 'folderName',
  default: '',
});

// 클릭한 관광지 정보
export const tourInfo = atom({
  key: 'tourInfo',
  default: {},
});

// export const getSchedule = selector({
//   key: 'getSchedule',
//   get: ({ get }) => {
//     return get(scheduleItem);
//   },
// });
