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
    amPm: string;
    time: number;
    hour: string;
    minute: number;
  };
  setWhen: any;
}) => {
  // const newPlan = useRecoilValue<PlanType>(NewPlanRecoil);

  // const { date, index, isOpen } = useRecoilValue(WhichEvent);

  // const setMemo = useSetRecoilState(MemoAndTime);
  // const [hour, setHour] = useState(1);
  // const [minute, setMinute] = useState('0');
  // const [amPm, setAmPm] = useState('3');

  // useEffect(() => {
  //   setMemo((prev) => {
  //     console.log(amPm);
  //     return {
  //       ...prev,
  //       when: {
  //         time: hour * 60 + parseInt(minute),
  //         amPm: parseInt(amPm),
  //         hour: hour,
  //         minute: parseInt(minute),
  //       },
  //     };
  //   });
  //   setHour(hour);
  //   setMinute(minute);
  //   setAmPm(amPm);
  // }, [hour, minute, amPm]);

  // useEffect(() => {
  //   if (isOpen) {
  //     // 드롭다운박스 열리면 시간 셋팅하기
  //     const eventTime: any = newPlan.schedule[date][index]['when']['time'];
  //     setHour(eventTime === 999 ? 1 : Math.floor(eventTime / 60));
  //     setMinute(
  //       String(
  //         eventTime === 999 ? 0 : eventTime - Math.floor(eventTime / 60) * 60,
  //       ),
  //     );
  //     console.log(newPlan.schedule[date]);
  //   }
  // }, [isOpen, index, date]);

  // 저장을 눌렀냐 안눌렀냐로 체크해야 할듯 열었다가 아닌

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
            return { ...prev, hour: Number(event.target.value) };
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
        type="number"
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
