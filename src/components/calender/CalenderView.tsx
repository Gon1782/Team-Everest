import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Time, { AmPm, Minute } from './TimePackage';
const CalenderView = () => {
  // props는 선택한 관광지 정보를 받을 예정
  //
  const [date, setDate] = useState(new Date()); // 캘린더에 날짜 state
  const [showCalenderView, setShowCalenderView] = useState(false); // 캘린더 display

  console.log(date);

  return (
    <div>
      <div>
        <button onClick={() => setShowCalenderView((prev) => !prev)}>
          일정 추가!
        </button>
      </div>

      {showCalenderView && (
        <>
          <Calendar onChange={setDate} value={date} />
          <div className="text-gray-500 mt-4"></div>
          <AmPm />
          <Time />
          <Minute />
          <button>저장</button>
        </>
      )}
    </div>
  );
};

export default CalenderView;
