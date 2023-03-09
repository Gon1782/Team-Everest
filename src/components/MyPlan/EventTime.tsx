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
      <TimeSelect
        onChange={(event) =>
          setWhen((prev: any) => {
            return { ...prev, amPm: event.target.value };
          })
        }
        width={25}
        value={when.amPm}
      >
        <option key="오전" value="1">
          오전
        </option>
        <option key="오후" value="2">
          오후
        </option>
      </TimeSelect>
      <TimeSelect
        onChange={(event) =>
          setWhen((prev: any) => {
            return { ...prev, hour: event.target.value };
          })
        }
        width={20}
        value={when.hour}
      >
        {hourList.map((item: number) => {
          return (
            <option key={item} value={item} defaultValue={when.hour}>
              {item}
            </option>
          );
        })}
      </TimeSelect>
      <EventFont>시</EventFont>
      <MinuteInput
        type="text"
        onChange={(event) =>
          setWhen((prev: any) => {
            return { ...prev, minute: event.target.value };
          })
        }
        value={when.minute}
        style={{}}
      />
      <EventFont>분</EventFont>
    </PlanTimeMemoContainer>
  );
};

export default EventTime;

const PlanTimeMemoContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: #f1f6f9;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  /* & > p,
  h1 {
    font-size: 13px;
    font-family: 'swiper-icons';
  } */
`;

const TimeSelect = styled.select<{ width: number }>`
  width: ${(props) => props.width + '%'};
  border: 0px;
  text-align: center;
  background-color: #f1f6f9;
  font-size: 14px;
`;
const MinuteInput = styled.input`
  width: 10%;
  font-family: 'emoji';
  font-size: 14px;
  margin-left: 5px;
  text-align: center;
  background-color: #f1f6f9;
`;

const EventFont = styled.p`
  font-size: 14px;
  font-family: 'swiper-icons';
`;
