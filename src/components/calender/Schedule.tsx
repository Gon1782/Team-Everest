import React, { useState } from 'react';

export const Schedule = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [amPm, setAmPm] = useState('오전');

  const onChangeMinute = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setMinute(Number(event.target.value));
  };
  const onChangeHour = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHour(Number(event.target.value));
  };
  const onChangeAmPm = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setAmPm(event.target.value);
  };

  const hourList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div>
      <select onChange={onChangeAmPm}>
        <option key="오전" value="오전">
          오전
        </option>
        <option key="오후" value="오후">
          오후
        </option>
      </select>
      <select onChange={onChangeHour}>
        {hourList.map((item: number) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      시
      <input type="number" onChange={onChangeMinute} placeholder="00" />
    </div>
  );
};
