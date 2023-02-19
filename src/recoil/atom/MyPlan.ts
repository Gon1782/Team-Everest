import { db } from '@/common/api/firebase';
import { dateToString } from '@/components/MyPlan/MyPlannerHandler';
import { Item } from '@/types/DetailType';
import { async } from '@firebase/util';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { atom, atomFamily, selector } from 'recoil';

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
  startDate: {};
  endDate: {};
  schedule: { [key: string]: [] };
  contentId: 0;
}

export interface PickScheduleType {
  schedule: string;
  day: string;
}

//  일정 데이터
export const NewPlanRecoil = atom({
  key: 'NewPlanRecoil',
  default: <PlanType>{
    name: '',
    startDate: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      date: new Date().getDate(),
      yyyymmdd: dateToString(new Date()),
    },
    endDate: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      date: new Date().getDate(),
      yyyymmdd: dateToString(new Date()),
    },
    schedule: {},
    isDelete: false,
    contentId: 0,
  },
});

// 관광지 데이터
export const TourListRecoil = atom({
  key: 'TourList',
  default: <Item[]>[],
});

// 현재 관광지 추가 작업중인 일정 카드
export const PickScheduleRecoil = atom({
  key: 'PickScheduleRecoil',
  default: <PickScheduleType>{ schedule: '', day: '' },
});

// 지정할 시간,메모 데이터
export const MemoAndTime = atom({
  key: 'memoAndTime',
  default: { memo: '', time: {} },
});

// 초기 좌표 데이터
export const InitLocation = atom({
  key: 'InitLocation',
  default: { x: 126.98117041998981, y: 37.545642179638556, level: 10 },
});

// 캘린더 열기/닫기 데이터
export const IsCalenderView = atom({
  key: 'IsCalenderView',
  default: false,
});

// 사이드 메뉴 열기/닫기 데이터
export const IsSidePageView = atom({
  key: 'IsSidePageView',
  default: false,
});

// 사이드 메뉴 열기/닫기 데이터
export const DropDownRef = atom({
  key: 'DropDownRef',
  default: <React.MutableRefObject<any>>{ current: {} },
});
