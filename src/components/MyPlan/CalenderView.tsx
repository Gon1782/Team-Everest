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

const CalenderView = ({ setDropDownRef }: { setDropDownRef: any }) => {
  const [newPlan, setNewPlan] = useRecoilState<PlanType | any>(NewPlanRecoil);
  // 캘린더 열기/닫기
  const isShowCalender = useRecoilValue(IsCalenderView);

  const setPickSchedule = useSetRecoilState(PickScheduleRecoil);

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
        planSchedule[dateToString(date)] =
          newPlan.schedule[dateToString(date)] ?? [];
      });

      dropDownRef.current = { ...planSchedule };
      setDropDownRef(() => {
        const newData: any = {};
        newData['current'] = { ...dropDownRef.current };
        return newData;
      });

      return {
        ...prev,
        schedule: { ...planSchedule },
        startDate: dateToObject(calenderDate[0]),
        endDate: dateToObject(calenderDate[1]),
      };
    });
    setPickSchedule({ schedule: dateToString(calenderDate[0]), day: 'Day1' });
  }, [calenderDate]);

  return (
    <>
      {isShowCalender && (
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
      )}

      <div className="text-gray-500 mt-4"></div>
    </>
  );
};

export default CalenderView;

// const Main = styled.div`
//   width: 100%;
// `;
