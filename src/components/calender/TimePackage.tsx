import React, { useState } from 'react';

const Time = () => {
  // 시간 설정 select box 만들기
  const makeTimeBox = () => {
    let result = [];
    for (let i = 1; i < 13; i++) {
      result.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }
    return result;
  };
  return <select>{makeTimeBox()}</select>;
};

export const AmPm = () => {
  // 오전 오후 설정 select box 만들기

  return (
    <select>
      <option key="오전" value="오전">
        오전
      </option>
      <option key="오후" value="오후">
        오후
      </option>
    </select>
  );
};

export const Minute = () => {
  // 분 설정
  const [minute, setMinute] = useState();

  const filterMinute = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자 문자열이 아닌 다른 문자열이 들어온 경우 팅겨내기
    console.log(event.target.value);
  };
  return (
    <>
      <input
        type="text"
        value={minute}
        // onChange={(event) => filterMinute(event)}
        onChange={filterMinute}
      />
    </>
  );
};

export default Time;
