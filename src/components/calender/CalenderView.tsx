import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { nowSchedule } from '@/atom/calender/scheduleState';
import { useRecoilState, useRecoilValue } from 'recoil';
const CalenderView = ({
  folder,
  tourInfo,
}: {
  folder: string;
  tourInfo: {};
}) => {
  // props는 선택한 관광지 정보, 총 일정 데이터, 일정이름(폴더)를 받을 예정

  // 캘린더
  const [calenderDate, setCalenderDate] = useState(new Date()); // 캘린더에 날짜 state
  const [showCalenderView, setShowCalenderView] = useState(false); // 캘린더 display

  // 일정 관련 상태값들
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);
  const [amPm, setAmPm] = useState('오전');

  // 리코일로 저장할 데이터
  // 1. 선택한 년도,월,일
  const [schedule, setSchedule] = useRecoilState(nowSchedule);

  const onChangeMinute = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinute(Number(event.target.value));
  };
  const onChangeHour = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHour(Number(event.target.value));
  };
  const onChangeAmPm = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAmPm(event.target.value);
  };

  const dateHandler = (): any => {
    // 객체로 만든 이유
    // 년,월,일,오전오후,시간,분을 문자열 한줄로 처리하게 되면
    // 다른 컴포넌트에서 문자열로 처리된 이 데이터들을 다시 편집해야하는 번거로움이 생김
    // 그래서 필요한 데이터 들만 뽑아서 사용하게끔 객체로 처리함

    const year = calenderDate.getFullYear().toString();
    const month =
      calenderDate.getMonth() + 1 < 10 // 1~9월 앞에 0 붙이기
        ? '0' + (calenderDate.getMonth() + 1)
        : calenderDate.getMonth() + 1;
    const date =
      calenderDate.getDate() < 10 // 1~9일 앞에 0 붙이기
        ? '0' + calenderDate.getDate().toString()
        : calenderDate.getDate().toString();
    const pickHour = hour < 10 ? '0' + hour : hour;
    const pickMinute = minute < 10 ? '0' + minute : minute;
    const pickAmPm = amPm;

    const scheduleInfo = {
      ///// 혹시 나중에 쓸 일이 있을까 싶어서 만들어놓음, 안쓰면 지울 예정
      year: year,
      month: month,
      date: date,
      hour: pickHour,
      minute: pickMinute,
      ////
      amPm: pickAmPm,
      yyyymmdd: `${year}${month}${date}`,
      time: `${pickHour}${pickMinute}`,
    };

    return scheduleInfo;
  };

  // 유효성 검사 및 일정 저장 메소드
  const checkData = () => {
    // 일정 폴더 생성했는지 검사 해야함
    if (Number(minute) > 59) {
      return alert('분 다시 작성');
    }
    const scheduleInfo = dateHandler();

    // 일정 추가할지 물어보기
    if (
      confirm(
        `${scheduleInfo.year}년 ${scheduleInfo.month}월 ${scheduleInfo.date}일 ${scheduleInfo.amPm} ${scheduleInfo.hour}시 ${scheduleInfo.minute}분 으로 일정 추가 하시겠습니까?`,
      )
    ) {
      // 일정 추가
      const newSchedule: any = {};

      newSchedule[folder] = [
        { schedule: scheduleInfo, data: 'data' },
        ...schedule[folder],
      ];
      localStorage.setItem('nowSchedule', JSON.stringify(newSchedule));
      setSchedule(newSchedule);
    } else {
      // 취소
      alert('취소 되었습니다');
    }
  };

  // console.log(useRecoilValue(nowSchedule));

  const makeTimeBox = () => {
    let result = [];
    for (let i = hour; i < 13; i++) {
      result.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }
    return result;
  };
  return (
    <div>
      {/* <div>
        <button onClick={() => setShowCalenderView((prev) => !prev)}>
          일정 추가!
        </button>
      </div>

      {showCalenderView && (
        <> */}
      <Calendar onChange={setCalenderDate} value={calenderDate} />
      <div className="text-gray-500 mt-4"></div>
      <select onChange={onChangeAmPm}>
        <option key="오전" value="오전">
          오전
        </option>
        <option key="오후" value="오후">
          오후
        </option>
      </select>
      <select onChange={onChangeHour}>{makeTimeBox()}</select>시
      <input
        type="number"
        onChange={onChangeMinute}
        placeholder={`${minute}${minute}`}
      />
      분<button onClick={checkData}>저장</button>
      {/* </>
      )} */}
    </div>
  );
};

export default CalenderView;
