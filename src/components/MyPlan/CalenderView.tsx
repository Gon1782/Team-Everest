import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {
  PickScheduleRecoil,
  NewPlanRecoil,
  PlanType,
  MemoAndTime,
  IsCalenderView,
  DropDownRef,
} from '@/recoil/atom/MyPlan';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  scheduleHandler,
  stringConvert,
  stringConvert2,
  timeHandler,
} from './MyPlannerHandler';
import PlanScheduleList from './PlanScheduleList';
import Citymap from '../Citymap/Citymap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const CalenderView = ({ setDropDownRef }: { setDropDownRef: any }) =>
  //   {
  //   dropDownRef,
  // }: {
  //   dropDownRef: React.MutableRefObject<any>;
  // }
  {
    /* -----------------리코일 데이터--------------*/
    const [newPlan, setNewPlan] = useRecoilState<PlanType | any>(NewPlanRecoil);
    // 캘린더 열기/닫기
    const isShowCalender = useRecoilValue(IsCalenderView);
    //

    const dropDownRef = useRef<any>({});
    // 캘린더 날짜 초기화
    const [calenderDate, setCalenderDate] = useState([
      new Date(
        newPlan.startDate['year'],
        newPlan.startDate['month'],
        newPlan.startDate['date'],
      ),
      new Date(
        newPlan.endDate['year'],
        newPlan.endDate['month'],
        newPlan.endDate['date'],
      ),
    ]);

    useEffect(() => {
      // schedule 초기화
      const newSchedule = scheduleHandler(calenderDate[0], calenderDate[1]);

      setNewPlan((prev: any) => {
        const planSchedule: any = {};

        newSchedule.map((date: any) => {
          planSchedule[stringConvert(date)] =
            newPlan.schedule[stringConvert(date)] ?? [];
        });

        dropDownRef.current = { ...planSchedule };
        console.log('dropDownRefdropDownRef', dropDownRef);
        setDropDownRef(() => {
          const clone: any = {};
          clone['current'] = { ...dropDownRef.current };
          console.log(clone);
          return clone;
        });

        return {
          name: prev.name,
          schedule: { ...planSchedule },
          startDate: stringConvert2(calenderDate[0]),
          endDate: stringConvert2(calenderDate[1]),
        };
      });
    }, [calenderDate]);

    return (
      <>
        {/* <button onClick={() => setIsShowCalender((prev) => !prev)}>
        캘린더 아이콘
      </button> */}
        {isShowCalender && (
          <Calendar
            onChange={setCalenderDate}
            value={[calenderDate[0], calenderDate[1]]}
            selectRange={true}
          />
        )}

        {/* <PlanScheduleList dropDownRef={dropDownRef} /> */}

        <div className="text-gray-500 mt-4"></div>
      </>
    );
  };

export default CalenderView;

// const Main = styled.div`
//   width: 100%;
// `;
