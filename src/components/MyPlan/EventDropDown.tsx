import {
  Authority,
  MemoAndTime,
  NewPlanRecoil,
  PlanType,
  PreviousEvent,
  WhichEvent,
} from '@/recoil/atom/MyPlan';
import { Item } from 'firebase/analytics';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import EventMemo from './EventMemo';
import EventTime from './EventTime';

const EventDropDown = ({
  index,
  scheduleDate,
  dropDownRef,
}: {
  index: number;
  scheduleDate: any;
  dropDownRef: any;
}) => {
  const memoAndTime = useRecoilValue<any>(MemoAndTime);
  const authority = useRecoilValue(Authority);
  const [newPlan, setNewPlan] = useRecoilState<PlanType>(NewPlanRecoil);
  const setWhichEvent = useSetRecoilState(WhichEvent);
  const [previousEvent, setPreviousEvent] = useRecoilState<any>(PreviousEvent);
  // 해당일정의 시간,메모 설정하고 저장 버튼 눌렀을때
  const updateEventContent = (
    date: string,
    eventIndex: number,
    eventList: Item[],
  ) => {
    if (memoAndTime?.when['minute'] > 59 || memoAndTime?.when['minute'] < 0) {
      // 여기 다시
      return alert('시간을 다시 설정해주세요!');
    }

    setNewPlan((prev) => {
      // reduce,sorting,
      // filter, sorting ()

      const updateEventList = eventList
        .reduce((sum: any, item: any, idx: number) => {
          if (eventIndex === idx) {
            sum.push({
              ...item,
              memo: memoAndTime.memo,
              when: memoAndTime.when,
            });
          } else {
            sum.push(item);
          }
          return sum;
        }, [])
        .sort((a: any, b: any) => a?.when?.time - b?.when?.time);

      const newData: any = {};
      newData[date] = [...updateEventList];

      return {
        ...prev,
        schedule: { ...prev.schedule, ...newData },
      };
    });

    showDropDownPage(date, eventIndex); // 해당 드롭다운 닫기
  };

  // 일정 삭제
  const popEvent = (date: string, eventIndex: number, eventList: []) => {
    const newEventList = eventList.filter((_, index) => index !== eventIndex);
    const updateSchedule: any = {};
    updateSchedule[date] = newEventList;

    setNewPlan((prev) => {
      return {
        ...prev,
        schedule: { ...prev.schedule, ...updateSchedule },
      };
    });
  };

  // 시간/메모 수정 버튼 클릭시 드롭다운창 보여주기
  const showDropDownPage = (date: string, index: number) => {
    setPreviousEvent(previousEvent.concat({ date: date, index: index }));

    if (previousEvent.length) {
      const previousIndex = previousEvent.length - 1;
      if (
        // 다른 일정 클릭했는지, 다른 관광지 눌렀는지 체크!!!
        previousEvent[previousIndex].date !== date ||
        previousEvent[previousIndex].index !== index
      ) {
        // 다른거 눌렀으면 전에 열었던거 닫기
        dropDownRef.current[previousEvent[previousIndex].date][
          previousEvent[previousIndex].index
        ].style.display = 'none';
      }
    }
    // 지금 클릭한 시간/메모 수정 드롭다운 열기
    const isDisplay = dropDownRef.current[date][index].style.display;
    dropDownRef.current[date][index].style.display =
      isDisplay === 'none' ? 'block' : 'none';

    // 선택한 드롭박스에 정보 셋팅
    setWhichEvent({
      date: date,
      index: index,
      isOpen: isDisplay === 'none' ? true : false,
    });
  };

  return (
    <>
      {authority.write && (
        <>
          <button onClick={() => showDropDownPage(scheduleDate, index)}>
            시간/메모 설정
          </button>
          <button
            onClick={() =>
              popEvent(scheduleDate, index, newPlan.schedule[scheduleDate])
            }
          >
            삭제
          </button>
        </>
      )}
      <div
        style={{ display: 'none' }}
        ref={(el: any) => {
          // 각 div에 ref 할당하기 : 드롭다운페이지의 display 때문에

          const clone = !!dropDownRef.current[scheduleDate]
            ? [...dropDownRef?.current[scheduleDate]] // 수정 페이지로 들어온 경우
            : []; // 작성 페이지로 들어온 경우
          clone[index] = el;
          dropDownRef.current[scheduleDate] = clone;
        }}
      >
        시간/메모 설정페이지
        <EventTime />
        <EventMemo />
        <button
          onClick={() =>
            updateEventContent(
              scheduleDate,
              index,
              newPlan.schedule[scheduleDate],
            )
          }
        >
          저장
        </button>
      </div>
    </>
  );
};

export default EventDropDown;
