export const dateHandler = (calenderDate: Date, schedule: any): any => {
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
  // const pickHour = hour < 10 ? '0' + hour : hour;
  // const pickMinute = minute < 10 ? '0' + minute : minute;
  // const pickAmPm = amPm;

  const scheduleInfo = {
    ///// 혹시 나중에 쓸 일이 있을까 싶어서 만들어놓음, 안쓰면 지울 예정
    year: year,
    month: month,
    date: date,
    //   hour: pickHour,
    //   minute: pickMinute,
    //   ////
    //   amPm: pickAmPm,
    yyyymmdd: `${year}${month}${date}`,
    //   time: `${pickHour}${pickMinute}`,
  };

  return scheduleInfo;
};

export const timeHandler = (timeObject: any): any => {
  // 객체로 만든 이유
  // 년,월,일,오전오후,시간,분을 문자열 한줄로 처리하게 되면
  // 다른 컴포넌트에서 문자열로 처리된 이 데이터들을 다시 편집해야하는 번거로움이 생김
  // 그래서 필요한 데이터 들만 뽑아서 사용하게끔 객체로 처리함
  // const year = calenderDate.getFullYear().toString();
  // const month =
  //   calenderDate.getMonth() + 1 < 10 // 1~9월 앞에 0 붙이기
  //     ? '0' + (calenderDate.getMonth() + 1)
  //     : calenderDate.getMonth() + 1;
  // const date =
  //   calenderDate.getDate() < 10 // 1~9일 앞에 0 붙이기
  //     ? '0' + calenderDate.getDate().toString()
  //     : calenderDate.getDate().toString();
  // // const pickHour = hour < 10 ? '0' + hour : hour;
  // // const pickMinute = minute < 10 ? '0' + minute : minute;
  // // const pickAmPm = amPm;
  // const scheduleInfo = {
  //   ///// 혹시 나중에 쓸 일이 있을까 싶어서 만들어놓음, 안쓰면 지울 예정
  //   year: year,
  //   month: month,
  //   date: date,
  //   //   hour: pickHour,
  //   //   minute: pickMinute,
  //   //   ////
  //   //   amPm: pickAmPm,
  //   yyyymmdd: `${year}${month}${date}`,
  //   //   time: `${pickHour}${pickMinute}`,
  // };
  // return scheduleInfo;
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
