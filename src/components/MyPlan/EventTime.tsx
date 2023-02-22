import {
  MemoAndTime,
  NewPlanRecoil,
  PlanType,
  PreviousEvent,
  WhichEvent,
} from '@/recoil/atom/MyPlan';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const EventTime = () => {
  const newPlan = useRecoilValue<PlanType>(NewPlanRecoil);

  const [{ date, index, isOpen }, setWhichEvent] = useRecoilState(WhichEvent);

  const setMemo = useSetRecoilState(MemoAndTime);
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState('0');
  const [amPm, setAmPm] = useState('오전');

  useEffect(() => {
    setMemo((prev) => {
      return {
        ...prev,
        when: {
          time: hour * 60 + parseInt(minute),
          amPm: amPm,
          hour: hour,
          minute: parseInt(minute),
        },
      };
    });
  }, [hour, minute, amPm]);

  useEffect(() => {
    if (isOpen) {
      // 드롭다운박스 열리면 시간 셋팅하기
      const eventTime = newPlan.schedule[date][index]['when']['time'];
      setHour(eventTime === 999 ? 1 : Math.floor(eventTime / 60));
      setMinute(
        String(
          eventTime === 999 ? 0 : eventTime - Math.floor(eventTime / 60) * 60,
        ),
      );
      setAmPm(newPlan.schedule[date][index]['when']['amPm']);
    }
  }, [isOpen, index, date]);

  const hourList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div>
      <select onChange={(event) => setAmPm(event.target.value)} value={amPm}>
        <option key="오전" value="오전">
          오전
        </option>
        <option key="오후" value="오후">
          오후
        </option>
      </select>
      <select
        onChange={(event) => setHour(Number(event.target.value))}
        value={hour}
      >
        {hourList.map((item: number) => {
          return (
            <option key={item} value={item} defaultValue={hour}>
              {item}
            </option>
          );
        })}
      </select>
      시
      <input
        type="number"
        onChange={(event) => setMinute(event.target.value)}
        value={minute}
      />
    </div>
  );
};

export default EventTime;
