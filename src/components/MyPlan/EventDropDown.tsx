import {
  Authority,
  MemoAndTime,
  NewPlanRecoil,
  PlanType,
  PreviousEvent,
  WhichEvent,
} from '@/recoil/atom/MyPlan';
import { Item } from 'firebase/analytics';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import EventMemo from './EventMemo';
import EventTime from './EventTime';
import styled from 'styled-components';
import { FaRegTrashAlt } from 'react-icons/fa';

const EventDropDown = ({
  index,
  scheduleDate,
  eventRef,
}: {
  index: number;
  scheduleDate: any;
  eventRef: any;
}) => {
  const memoAndTime = useRecoilValue<any>(MemoAndTime);
  const authority = useRecoilValue(Authority);
  const [newPlan, setNewPlan] = useRecoilState<PlanType>(NewPlanRecoil);
  const setWhichEvent = useSetRecoilState(WhichEvent);
  const [previousEvent, setPreviousEvent] = useRecoilState<any>(PreviousEvent);
  const [initEventWhen, setInitEventWhen] = useState<any>({});
  const [initEventMemo, setInitEventMemo] = useState('');

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

      // 이게 맞누,,,
      const updateEventList = eventList
        .reduce((sum: any, item: any, idx: number) => {
          if (eventIndex === idx) {
            console.log({
              amPm: Number(initEventWhen.amPm),
              time: initEventWhen.hour * 60 + Number(initEventWhen.minute),
              hour: initEventWhen.hour,
              minute: initEventWhen.minute,
            });
            sum.push({
              ...item,
              memo: initEventMemo,
              when: {
                amPm: Number(initEventWhen.amPm),
                time: initEventWhen.hour * 60 + Number(initEventWhen.minute),
                hour: initEventWhen.hour,
                minute: initEventWhen.minute,
              },
              isSave: true,
            });
          } else {
            sum.push(item);
          }
          return sum;
        }, [])
        .sort((a: any, b: any) => {
          return a?.when?.amPm > b?.when?.amPm // 오전 , 오후 , 미정 순으로
            ? 1
            : a?.when?.amPm < b?.when?.amPm
            ? -1
            : a?.when?.time - b?.when?.time;
        });

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
  const showDropDownPage = (date: string, index: number): any => {
    const event = newPlan.schedule[date][index];

    setPreviousEvent(previousEvent.concat({ date: date, index: index }));

    if (previousEvent.length) {
      const previousIndex = previousEvent.length - 1;
      if (
        // 다른 일정 클릭했는지, 다른 관광지 눌렀는지 체크!!!
        previousEvent[previousIndex].date !== date ||
        previousEvent[previousIndex].index !== index
      ) {
        // 다른거 눌렀으면 전에 열었던거 닫기
        eventRef.current[previousEvent[previousIndex].date][
          previousEvent[previousIndex].index
        ].style.display = 'none';
      }
    }
    // 지금 클릭한 시간/메모 수정 드롭다운 열기
    const isDisplay = eventRef.current[date][index].style.display;
    eventRef.current[date][index].style.display =
      isDisplay === 'none' ? 'block' : 'none';
    if (event['isSave'] === false || event['when']['time'] === 999) {
      // if (event['isSave'] === false || event['when']['time'] === 999) {
      // 저장 여부
      setInitEventWhen({
        // 저장 안했으면 초기화
        amPm: 1,
        time: 60,
        hour: 1,
        minute: 0,
      });
    } else {
      setInitEventWhen(event['when']); // 저장되어있는 이벤트면 불러서 초기화
      setInitEventMemo(event['memo']);
    }
  };

  return (
    <>
      {authority.write && (
        <EventTimeMemoSet>
          <EventTimeMemoSetBtn
            onClick={() => showDropDownPage(scheduleDate, index)}
          >
            시간/메모 설정
          </EventTimeMemoSetBtn>
        </EventTimeMemoSet>
      )}
      <EventTimeMemoSetDrop
        style={{ display: 'none' }}
        ref={(el: any) => {
          // 각 div에 ref 할당하기 : 드롭다운페이지의 display 때문에
          const clone = !!eventRef.current[scheduleDate]
            ? [...eventRef?.current[scheduleDate]] // 수정 페이지로 들어온 경우
            : []; // 작성 페이지로 들어온 경우
          clone[index] = el;
          eventRef.current[scheduleDate] = clone;
        }}
      >
        {/* 시간/메모 설정페이지 */}
        <EventTime when={initEventWhen} setWhen={setInitEventWhen} />
        <EventMemo memo={initEventMemo} setMemo={setInitEventMemo} />
        <TimeMemoSaveBtn
          onClick={() =>
            updateEventContent(
              scheduleDate,
              index,
              newPlan.schedule[scheduleDate],
            )
          }
        >
          저장
        </TimeMemoSaveBtn>
      </EventTimeMemoSetDrop>
    </>
  );
};

export default EventDropDown;

// 시간 메모 설정
const EventTimeMemoSet = styled.div`
  width: 80%;
  margin: 0 auto;
`;

// 시간, 설정 드롭메뉴
const EventTimeMemoSetDrop = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const TimeMemoSaveBtn = styled.button``;
const EventTimeMemoSetBtn = styled.button`
  width: 100%;
  height: 20px;
  font-size: 5px;
  font-weight: 400;
  background-color: white;
`;
