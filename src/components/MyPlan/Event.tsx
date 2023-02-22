import {
  Authority,
  InitLocation,
  MemoAndTime,
  NewPlanRecoil,
  PlanType,
} from '@/recoil/atom/MyPlan';
import { Item } from 'firebase/analytics';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import EventMemo from './EventMemo';
import EventTime from './EventTime';
import { timeHandler } from './MyPlannerHandler';

// 일정 데이터
const Event = ({ index, item }: { index: number; item: any }) => {
  const setInitLocation = useSetRecoilState(InitLocation);

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
    </>
  );
};

export default Event;
