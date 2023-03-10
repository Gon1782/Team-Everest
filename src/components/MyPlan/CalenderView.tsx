import { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  PickScheduleRecoil,
  NewPlanRecoil,
  PlanType,
  IsCalenderView,
} from '@/recoil/atom/MyPlan';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  scheduleHandler,
  dateToObject,
  dateToString,
} from './MyPlannerHandler';
import styled from 'styled-components';

const CalenderView = ({
  setEventRef,
  setScheduleRef,
}: {
  setEventRef: any;
  setScheduleRef: any;
}) => {
  const [newPlan, setNewPlan] = useRecoilState<PlanType | any>(NewPlanRecoil);
  // 캘린더 열기/닫기
  const [isShowCalender, setIsShowCalender] = useRecoilState(IsCalenderView);

  const setPickSchedule = useSetRecoilState(PickScheduleRecoil);

  const eventRef = useRef<any>({});
  const scheduleRef = useRef<any>([]);
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
        planSchedule[dateToString(date)] =
          newPlan.schedule[dateToString(date)] ?? [];
      });
      scheduleRef.current = new Array(newSchedule.length);
      eventRef.current = { ...planSchedule };
      setEventRef(() => {
        const newData: any = {};
        newData['current'] = { ...eventRef.current };
        return { ...eventRef };
      });
      setScheduleRef(() => {
        // const newData: any = {};
        // newData['current'] = { ...eventRef.current };
        return { ...scheduleRef };
      });

      return {
        ...prev,
        schedule: { ...planSchedule },
        startDate: dateToObject(calenderDate[0]),
        endDate: dateToObject(calenderDate[1]),
        totalSchedule: newSchedule.length,
      };
    });
    setPickSchedule({ schedule: dateToString(calenderDate[0]), day: 'Day1' });
    setIsShowCalender(false);
  }, [calenderDate]);

  return (
    <>
      {isShowCalender && (
        <div style={{ marginBottom: 25 }}>
          <Calendar
            // onChange={!authority.update ? setCalenderDate : () => {}}
            onChange={setCalenderDate}
            value={[
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
            ]}
            selectRange={true}
          />
        </div>
      )}
    </>
  );
};

export default CalenderView;
