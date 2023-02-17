import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SidePage from './SidePage';
import { PickScheduleType } from '@/recoil/atom/MyPlan';
import {
  PickScheduleRecoil,
  MyPlanRecoil,
  PlanType,
  MemoAndTime,
} from '@/recoil/atom/MyPlan';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import EventTime from './EventTime';
import EventMemo from './EventMemo';
import { scheduleHandler } from './ScheduleHandler';

const CalenderView = () => {
  /* -----------------리코일 데이터--------------*/
  // 작업할 플래너 데이터
  const [newPlan, setNewPlan] = useRecoilState<PlanType>(MyPlanRecoil);
  // 자식 컴포넌트에서 가져올 메모,시간 데이터
  const memoAndTime = useRecoilValue(MemoAndTime);
  // 현재 작업중인 일정 데이터
  const setPickSchedule =
    useSetRecoilState<PickScheduleType>(PickScheduleRecoil);
  /* ----------------------------------------*/

  // planner에 있는 일정들 배열처리 , Day1 ,Day2 카드와 해당 날짜를 표현하기 위해 따로 처리함
  const planSchedule = Object.keys(newPlan.schedule); //['날짜','날짜',...]

  // 캘린더 날짜 초기화
  const [calenderDate, setCalenderDate] = useState([
    new Date(newPlan.startDate), // 시작
    new Date(newPlan.endDate), // 마지막
  ]);

  // 드롭 다운 레퍼런스 객체, useEffect에서 초기화함
  const dropDownRef = useRef<any>({});

  // 사이드창 display
  const [showSideSection, setShowSideSection] = useState(false);

  useEffect(() => {
    // schedule 초기화

    const newSchedule = scheduleHandler(calenderDate[0], calenderDate[1]);

    setNewPlan((prev) => {
      const planSchedule: any = {};
      newSchedule.map((item: any) => {
        const scheduleKey = `${item.getFullYear()}${
          item.getMonth() + 1
        }${item.getDate()}`;
        planSchedule[scheduleKey] = [];
      });

      dropDownRef.current = { ...planSchedule };
      return {
        name: prev.name,
        schedule: { ...planSchedule },
        startDate: calenderDate[0],
        endDate: calenderDate[1],
      };
    });
  }, [calenderDate]);

  // 일정 추가 버튼 누르면 사이드 창이 보임
  // 사이드 창에 필요한 해당 일정 데이터를 리코일에 저장
  const onChangeSideSection = (index: number) => {
    setShowSideSection(true); // 사이드창 열고
    setPickSchedule((prev) => {
      const clonePrev = { ...prev };
      clonePrev.day = `Day${index + 1}`;
      clonePrev.schedule = planSchedule[index];
      return clonePrev;
    });
  };

  // 일정 삭제
  const popEvent = (date: string, popIndex: number, eventList: []) => {
    const newEventList = eventList.filter((item, index) => index !== popIndex);
    const updateSchedule: any = {};
    updateSchedule[date] = newEventList;

    setNewPlan((prev) => {
      return {
        name: prev.name,
        schedule: { ...prev.schedule, ...updateSchedule },
        startDate: calenderDate[0],
        endDate: calenderDate[1],
      };
    });
  };

  // 해당일정의 시간,메모 설정하고 완료 버튼 눌렀을때
  const updateEventContent = (
    date: string,
    updateIndex: number,
    eventList: [],
  ) => {
    setNewPlan((prev) => {
      const updateEventList = eventList.reduce(
        (sum: any, item: any, idx: number) => {
          if (updateIndex === idx) {
            const cloneItem: any = { ...item };
            cloneItem['memo'] = memoAndTime.memo;
            cloneItem['time'] = memoAndTime.time;
            sum.push(cloneItem);
            return sum;
          } else {
            sum.push(item);
            return sum;
          }
        },
        [],
      );

      const newData: any = {};
      newData[date] = [...updateEventList];
      showDropDownPage(date, updateIndex);
      return {
        name: prev.name,
        schedule: { ...prev.schedule, ...newData },
        startDate: prev.startDate,
        endDate: prev.endDate,
      };
    });
  };
  // 시간/메모 수정 버튼 클릭시 드롭다운창 보여주기
  const showDropDownPage = (date: string, index: number) => {
    const isDisplay = dropDownRef.current[date][index].style.display;
    dropDownRef.current[date][index].style.display =
      isDisplay === 'none' ? 'block' : 'none';
  };

  return (
    <div>
      <Calendar
        onChange={setCalenderDate}
        value={[calenderDate[0], calenderDate[1]]}
        selectRange={true}
      />
      {!!planSchedule?.length &&
        planSchedule.map((date, index) => {
          return (
            <div key={index}>
              <div>
                Day{index + 1} |{date}
              </div>
              {!!newPlan.schedule[date].length &&
                newPlan.schedule[date].map((item: any, index) => {
                  console.log('qweqwe', item);
                  return (
                    <div style={{ display: 'block' }} key={index}>
                      {item.time.amPm ?? ''}
                      {item.time.hour ?? '--:'}
                      {item.time.minute ?? '--'}
                      {item.title}
                      {item.memo}
                      <button onClick={() => showDropDownPage(date, index)}>
                        시간/메모 설정
                      </button>
                      <button
                        onClick={() =>
                          popEvent(date, index, newPlan.schedule[date])
                        }
                      >
                        삭제
                      </button>
                      <div
                        style={{ display: 'none' }}
                        ref={(el: any) => {
                          // 각 div에 ref 할당하기 : 드롭다운페이지의 display 때문에
                          const clone = [...dropDownRef.current[date]];
                          clone[index] = el;
                          dropDownRef.current[date] = clone;
                        }}
                      >
                        시간/메모 설정페이지
                        <EventTime />
                        <EventMemo />
                        <button
                          onClick={() =>
                            updateEventContent(
                              date,
                              index,
                              newPlan.schedule[date],
                            )
                          }
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  );
                })}

              <button onClick={() => onChangeSideSection(index)}>
                일정 추가
              </button>
            </div>
          );
        })}
      <div className="text-gray-500 mt-4"></div>
      {showSideSection && <SidePage />}
    </div>
  );
};

export default CalenderView;
