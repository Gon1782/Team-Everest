import {
  MemoAndTime,
  NewPlanRecoil,
  PlanType,
  WhichEvent,
} from '@/recoil/atom/MyPlan';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const EventTime = ({
  when,
  setWhen,
}: {
  when: {
    amPm: number;
    time: number;
    hour: number;
    minute: number;
  };
  setWhen: any;
}) => {
  const hourList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <PlanTimeMemoContainer>
      <select
        onChange={(event) =>
          setWhen((prev: any) => {
            return { ...prev, amPm: event.target.value };
          })
        }
        value={when.amPm}
      >
        <option key="오전" value="1">
          오전
        </option>
        <option key="오후" value="2">
          오후
        </option>
      </select>
      <select
        onChange={(event) =>
          setWhen((prev: any) => {
            return { ...prev, hour: event.target.value };
          })
        }
        value={when.hour}
      >
        {hourList.map((item: number) => {
          return (
            <option key={item} value={item} defaultValue={when.hour}>
              {item}
            </option>
          );
        })}
      </select>
      시
      <input
        type="text"
        onChange={(event) =>
          setWhen((prev: any) => {
            return { ...prev, minute: event.target.value };
          })
        }
        value={when.minute}
        style={{ width: '30%' }}
      />
    </PlanTimeMemoContainer>
  );
};

export default EventTime;

const PlanTimeMemoContainer = styled.div`
  width: 100%;
`;
