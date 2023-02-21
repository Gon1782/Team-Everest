import { MemoAndTime } from '@/recoil/atom/MyPlan';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

const EventTime = () => {
  const setMemo = useSetRecoilState(MemoAndTime);
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);
  const [amPm, setAmPm] = useState('오전');

  useEffect(() => {
    setMemo((prev) => {
      return {
        ...prev,
        when: { time: hour * 60 + minute, amPm: amPm },
      };
    });
  }, [hour, minute, amPm]);

  const hourList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div>
      <select onChange={(event) => setAmPm(event.target.value)}>
        <option key="오전" value="오전">
          오전
        </option>
        <option key="오후" value="오후">
          오후
        </option>
      </select>
      <select onChange={(event) => setHour(Number(event.target.value))}>
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
        onChange={(event) => setMinute(Number(event.target.value))}
        placeholder="00"
      />
    </div>
  );
};

export default EventTime;
