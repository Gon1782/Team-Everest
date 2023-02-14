import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SidePage from './SidePage';
import { PickScheduleType } from '@/recoil/atom/MyPlan';
import {
  PickScheduleRecoil,
  MyPlanRecoil,
  PlanType,
} from '@/recoil/atom/MyPlan';
import { useRecoilState } from 'recoil';

const CalenderView = () => {
  // props는 선택한 관광지 정보, 총 일정 데이터, 일정이름(폴더)를 받을 예정

  // 캘린더                                           // 시작날   ,   마지막날
  const [calenderDate, setCalenderDate] = useState([new Date(), new Date()]);

  //
  const [showSideSection, setShowSideSection] = useState(false); // 사이드창 display

  // 리코일로 저장할 데이터
  // 1. 선택한 년도,월,일
  const [newPlan, setNewPlan] = useRecoilState<PlanType>(MyPlanRecoil);
  const planSchedule = Object.keys(newPlan.schedule); //['날짜','날짜',...]
  //
  const [pickSchedule, setPickSchedule] =
    useRecoilState<PickScheduleType>(PickScheduleRecoil);

  useEffect(() => {
    // schedule 초기화
    const newSchedule = scheduleHandler(calenderDate[0], calenderDate[1]);

    setNewPlan((prev) => {
      const planSchedule: any = {};
      newSchedule.map((item: any) => {
        const scheduleKey = `${item.getFullYear()}${
          item.getMonth() + 1
        }${item.getDate()}`;
        planSchedule[scheduleKey] = [];
      });

      return { name: prev.name, schedule: planSchedule };
    });
  }, [calenderDate]);

  const scheduleHandler = (startDate: Date, endDate: Date): Date[] => {
    //ex)
    // 시작날 : 20220103 , 마지막날 : 20220110
    // 일정 카드(day1 , day2, day3 , ...)를 만들기 위해서는
    // 시작날부터 마지막날까지의 기간 배열이 필요함
    // [20220103,20220104,20220105,20220106,....,20220110]

    let isBreak = true;
    let date = 0;
    const scheduleList = [];

    while (isBreak) {
      const scheduleData = new Date(
        // Date 객체의 파라미터 조건은 number 형
        Number(startDate.getFullYear()),
        Number(startDate.getMonth()),
        Number(startDate.getDate() + date),
      );
      scheduleList.push(scheduleData);

      if (
        // 만든 데이터가 endDate와 같을때(다 만들어지면)
        scheduleData.getFullYear() +
          scheduleData.getMonth() +
          scheduleData.getDate() ===
        endDate.getFullYear() + endDate.getMonth() + endDate.getDate()
      ) {
        //  while 탈출
        isBreak = !isBreak;
      } else {
        date++;
      }
    }
    return scheduleList;
  };

  // 일정 추가 버튼 누르면 사이드 창이 보임
  // 사이드 창에 필요한 해당 일정 데이터를 리코일에 저장
  const onChangeSideSection = (index: number) => {
    setShowSideSection(true); // 사이드창 열고
    setPickSchedule((prev) => {
      const clonePrev = { ...prev };
      clonePrev.day = `Day${index + 1}`;
      clonePrev.schedule = planSchedule[index];
      return clonePrev;
    });
  };

  // const dateHandler = (date:Date): any => {
  //   // 객체로 만든 이유
  //   // 년,월,일,오전오후,시간,분을 문자열 한줄로 처리하게 되면
  //   // 다른 컴포넌트에서 문자열로 처리된 이 데이터들을 다시 편집해야하는 번거로움이 생김
  //   // 그래서 필요한 데이터 들만 뽑아서 사용하게끔 객체로 처리함

  //   const year = calenderDate.getFullYear().toString();
  //   const month =
  //     calenderDate.getMonth() + 1 < 10 // 1~9월 앞에 0 붙이기
  //       ? '0' + (calenderDate.getMonth() + 1)
  //       : calenderDate.getMonth() + 1;
  //   const date =
  //     calenderDate.getDate() < 10 // 1~9일 앞에 0 붙이기
  //       ? '0' + calenderDate.getDate().toString()
  //       : calenderDate.getDate().toString();
  //   const pickHour = hour < 10 ? '0' + hour : hour;
  //   const pickMinute = minute < 10 ? '0' + minute : minute;
  //   const pickAmPm = amPm;

  //   const scheduleInfo = {
  //     ///// 혹시 나중에 쓸 일이 있을까 싶어서 만들어놓음, 안쓰면 지울 예정
  //     year: year,
  //     month: month,
  //     date: date,
  //     hour: pickHour,
  //     minute: pickMinute,
  //     ////
  //     amPm: pickAmPm,
  //     yyyymmdd: `${year}${month}${date}`,
  //     time: `${pickHour}${pickMinute}`,
  //   };

  //   return scheduleInfo;
  // };

  // 유효성 검사 및 일정 저장 메소드
  // const checkData = () => {
  //   // 일정 폴더 생성했는지 검사 해야함
  //   if (Number(minute) > 59) {
  //     return alert('분 다시 작성');
  //   }
  //   const scheduleInfo = dateHandler();

  //   // 일정 추가할지 물어보기
  //   if (
  //     confirm(
  //       `${scheduleInfo.year}년 ${scheduleInfo.month}월 ${scheduleInfo.date}일 ${scheduleInfo.amPm} ${scheduleInfo.hour}시 ${scheduleInfo.minute}분 으로 일정 추가 하시겠습니까?`,
  //     )
  //   ) {
  //     // 일정 추가
  //     const newPlan: any = {};

  //     newPlan[planName] = [
  //       { scheduleInfo: scheduleInfo, data: 'data' },
  //       ...plan[planName],
  //     ];
  //     localStorage.setItem('nowPlan', JSON.stringify(newPlan));
  //     setPlan(newPlan);
  //   } else {
  //     // 취소
  //     alert('취소 되었습니다');
  //   }
  // };

  return (
    <div>
      <Calendar
        onChange={setCalenderDate}
        value={[calenderDate[0], calenderDate[1]]}
        selectRange={true}
      />
      {!!planSchedule?.length &&
        planSchedule.map((item, index) => {
          return (
            <>
              <div>
                Day{index + 1} |{item}
              </div>
              {!!newPlan.schedule[item].length &&
                newPlan.schedule[item].map((item: any, index) => {
                  return <>{item.title}</>;
                })}

              <button onClick={() => onChangeSideSection(index)}>
                일정 추가
              </button>
            </>
          );
        })}
      <div className="text-gray-500 mt-4"></div>
      {showSideSection && <SidePage />}
    </div>
  );
};

export default CalenderView;
