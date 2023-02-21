import {
  Authority,
  InitLocation,
  IsSidePageView,
  MemoAndTime,
  NewPlanRecoil,
  PickScheduleRecoil,
  PickScheduleType,
  PlanType,
} from '@/recoil/atom/MyPlan';
import React, { useEffect, useRef, useState } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { timeHandler } from './MyPlannerHandler';
import EventTime from './EventTime';
import EventMemo from './EventMemo';
import styled from 'styled-components';
import { Item } from '@/types/DetailType';

const PlanScheduleList = ({
  dropDownRef,
}: {
  dropDownRef: React.MutableRefObject<any>;
}) => {
  const [newPlan, setNewPlan] = useRecoilState<PlanType>(NewPlanRecoil);
  // planner에 있는 일정들 배열처리 , Day1 ,Day2 카드와 해당 날짜를 표현하기 위해 따로 처리함
  //['날짜','날짜',...]
  const [planSchedule, setPlanSchedule] = useState<any>([]);
  const setInitLocation = useSetRecoilState(InitLocation);
  const resetInitLocation = useResetRecoilState(InitLocation);

  const memoAndTime: any = useRecoilValue(MemoAndTime);
  const setPickSchedule =
    useSetRecoilState<PickScheduleType>(PickScheduleRecoil);
  const authority = useRecoilValue(Authority);

  // 사이드창 display
  const setShowSideSection = useSetRecoilState(IsSidePageView);
  // 일정 추가 버튼 누르면 사이드 창이 보임
  // 사이드 창에 필요한 해당 일정 데이터를 리코일에 저장
  const onChangeSidePage = (index: number) => {
    setShowSideSection(true); // 사이드창 열고
    setPickSchedule((prev) => {
      const clonePrev = { ...prev };
      clonePrev.day = `Day${index + 1}`;
      clonePrev.schedule = planSchedule[index];
      return clonePrev;
    });
  };
  // 일정 삭제
  const popEvent = (date: string, eventIndex: number, eventList: []) => {
    const newEventList = eventList.filter(
      (item, index) => index !== eventIndex,
    );
    const updateSchedule: any = {};
    updateSchedule[date] = newEventList;

    setNewPlan((prev) => {
      return {
        ...prev,
        schedule: { ...prev.schedule, ...updateSchedule },
      };
    });
  };

  // 해당일정의 시간,메모 설정하고 저장 버튼 눌렀을때
  const updateEventContent = (
    date: string,
    eventIndex: number,
    eventList: Item[],
  ) => {
    if (memoAndTime.when['time'] % 60 > 59) {
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
  // 시간/메모 수정 버튼 클릭시 드롭다운창 보여주기
  const showDropDownPage = (date: string, index: number) => {
    const isDisplay = dropDownRef.current[date][index].style.display;
    dropDownRef.current[date][index].style.display =
      isDisplay === 'none' ? 'block' : 'none';
  };

  // 작업중인 일정카드에서 다른일정카드를 클릭했을때 맵 을 초기화 해줘야함
  const initMap = (scheduleInfo: string) => {
    resetInitLocation();
    setPickSchedule((prev) => {
      return {
        schedule: scheduleInfo,
        day: prev.day,
      };
    });
  };

  useEffect(() => {
    setPlanSchedule(Object.keys(newPlan.schedule));
  }, [newPlan, dropDownRef]);

  return (
    <PlanItems>
      {!!planSchedule?.length &&
        planSchedule.map((scheduleDate: any, index: number) => {
          return (
            <PlanItem key={index}>
              <div onClick={() => initMap(scheduleDate)}>
                Day{index + 1} |{scheduleDate}
              </div>
              {authority.write && (
                <button onClick={() => onChangeSidePage(index)}>
                  일정 추가
                </button>
              )}
              {!!newPlan.schedule[scheduleDate]?.length &&
                newPlan.schedule[scheduleDate].map((item: any, index) => {
                  return (
                    <>
                      <div
                        style={{ display: 'block' }}
                        key={index}
                        onClick={() =>
                          setInitLocation({
                            y: parseFloat(item.mapy),
                            x: parseFloat(item.mapx),
                            level: 3,
                          })
                        }
                      >
                        {index + 1} 순위 :{timeHandler(item.when)}
                        {item.title}
                        {item.memo}
                      </div>
                      {authority.write && (
                        <>
                          <button
                            onClick={() =>
                              showDropDownPage(scheduleDate, index)
                            }
                          >
                            시간/메모 설정
                          </button>
                          <button
                            onClick={() =>
                              popEvent(
                                scheduleDate,
                                index,
                                newPlan.schedule[scheduleDate],
                              )
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
                })}
            </PlanItem>
          );
        })}
    </PlanItems>
  );
};

export default PlanScheduleList;

const PlanItems = styled.div`
  display: flex;
  margin: 60px 0;
  width: 100%;
  height: 100%;
  /* overflow-x: scroll; */
`;
const PlanItem = styled.div`
  width: 700px;
`;
