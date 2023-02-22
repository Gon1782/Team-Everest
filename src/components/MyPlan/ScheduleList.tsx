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
import ScheduleDate from './ScheduleDate';
import Event from './Event';
import EventDropDown from './EventDropDown';

const PlanScheduleList = ({
  dropDownRef,
}: {
  dropDownRef: React.MutableRefObject<any>;
}) => {
  const plan = useRecoilValue<PlanType>(NewPlanRecoil);
  const [planSchedule, setPlanSchedule] = useState<any>([]);

  useEffect(() => {
    setPlanSchedule(Object.keys(plan.schedule));
  }, [plan]); // dropDownRef

  return (
    <PlanItems>
      {!!planSchedule?.length &&
        planSchedule.map((scheduleDate: any, index: number) => {
          return (
            <PlanItem key={index}>
              <ScheduleDate // Day1 |20xx-몇월-며칠
                planSchedule={planSchedule}
                index={index}
                scheduleDate={scheduleDate}
              />
              {!!plan.schedule[scheduleDate]?.length &&
                plan.schedule[scheduleDate].map((item: any, index) => {
                  // 선택한 관광지들
                  return (
                    <>
                      <Event index={index} item={item} />
                      <EventDropDown
                        index={index}
                        scheduleDate={scheduleDate}
                        dropDownRef={dropDownRef}
                      />
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
