import { Item } from '@/types/DetailType';
import { atom } from 'recoil';

/*
  'plan' : {
    'name' : '' // 플랜 제목
    'schedule' :  // 플래너 이름  <- MyPlan 컴포넌트에서 처리
      {
        'yyyymmdd' :  // 일정 <- MyPlan 컴포넌트에서 처리
        [
          { // event <- 검색 사이드창에서 처리
            'time':'' , 'name':'장소이름' , 'contentId' : '장소번호',
            '위치x':'x좌표','위치y':'y좌표','memo':'메모값' , 'index' : 1
          }
        ],
        'yyyymmdd' : [
          {
            'time':'' , 'name':'장소이름' , 'contentId' : '장소번호',
            '위도':'위도값','경도':'경도값','memo':'메모값'
          }
        ],
        location : '', 
   } },{},{},...
*/

export interface PlanType {
  name: string;
  startDate: Date;
  endDate: Date;
  schedule: { [key: string]: [] };
}

export interface PickScheduleType {
  schedule: string;
  day: string;
}

// 전체 일정 리스트
export const MyPlanRecoil = atom({
  key: 'MyPlan',
  default: <PlanType>{
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    schedule: { schedule: [] },
  },
});

// 관광지 데이터
export const TourListRecoil = atom({
  key: 'TourList',
  default: <Item[]>[],
});

// 현재 작업 할 일정 데이터
export const PickScheduleRecoil = atom({
  key: 'PickScheduleRecoil',
  default: <PickScheduleType>{},
});

// 생성한 일정 폴더 이름
export const planName = atom({
  key: 'planName',
  default: '',
});

// 클릭한 관광지 정보
export const event = atom({
  key: 'event',
  default: <any>{},
});

// export const getSchedule = selector({
//   key: 'getSchedule',
//   get: ({ get }) => {
//     return get(scheduleItem);
//   },
// });
