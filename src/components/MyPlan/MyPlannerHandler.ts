import { db } from '@/common/api/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface ScheduleInfo {
  year: string;
  month: string;
  date: string;
}

// Date 정보를 문자열로 처리하는 메소드
export const stringConvert = (calenderDate: Date): any => {
  console.log('calenderDate', calenderDate);
  const year = calenderDate.getFullYear().toString();
  const month =
    calenderDate.getMonth() + 1 < 10 // 1~9월 앞에 0 붙이기
      ? '0' + (calenderDate.getMonth() + 1)
      : calenderDate.getMonth() + 1;
  const date =
    calenderDate.getDate() < 10 // 1~9일 앞에 0 붙이기
      ? '0' + calenderDate.getDate().toString()
      : calenderDate.getDate().toString();

  // const dateObj = {
  //   year: calenderDate.getFullYear(),
  //   month: calenderDate.getMonth() + 1,
  //   date: calenderDate.getDate(),
  //   yyyymmdd : `${year}-${month}-${date}`
  // };
  return `${year}-${month}-${date}`;
};

// Date 정보를 문자열로 처리하는 메소드
export const stringConvert2 = (calenderDate: Date): any => {
  const year = calenderDate.getFullYear().toString();
  const month =
    calenderDate.getMonth() + 1 < 10 // 1~9월 앞에 0 붙이기
      ? '0' + (calenderDate.getMonth() + 1)
      : calenderDate.getMonth() + 1;
  const date =
    calenderDate.getDate() < 10 // 1~9일 앞에 0 붙이기
      ? '0' + calenderDate.getDate().toString()
      : calenderDate.getDate().toString();

  const dateObj = {
    year: calenderDate.getFullYear(),
    month: calenderDate.getMonth(),
    date: calenderDate.getDate(),
    yyyymmdd: `${year}-${month}-${date}`,
  };
  return dateObj;
};

// 문자열 데이터를 날짜 데이터로 바꾸는 메소드
export const dateConvert = (scheduleInfo: ScheduleInfo): any => {
  return new Date(
    Number(scheduleInfo.year),
    Number(scheduleInfo.month),
    Number(scheduleInfo.date),
  );
};

export const timeHandler = (
  time: { hour: number; minute: number; amPm: string } | string,
): any => {
  if (typeof time === 'string') return '--:--';
  const hour =
    time.hour < 10 // 1~9시 앞에 0 붙이기
      ? '0' + time.hour
      : time.hour;
  const minute =
    time.minute < 10 // 1~9분 앞에 0 붙이기
      ? '0' + time.minute
      : time.minute;

  return `${time.amPm} ${hour}:${minute}`;
};

export const scheduleHandler = (startDate: Date, endDate: Date): Date[] => {
  //ex)
  // 시작날 : 20220103 , 마지막날 : 20220110
  // 일정 카드(day1 , day2, day3 , ...)를 만들기 위해서는
  // 시작날부터 마지막날까지의 기간 데이터들이 필요함
  // [20220103(시작),20220104,20220105,20220106,....,20220110(끝)]

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

export const addWishList = async (event: any, userDBInfo: any) => {
  await updateDoc(doc(db, 'users', userDBInfo.uid), {
    myWish: [...userDBInfo.users['myWish'], { ...event }],
  });
};
