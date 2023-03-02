import { db } from '@/common/api/firebase';
import {
  updateAllPlannerDB,
  updateUserDB,
  getAllPlanner,
  getUserPlanList,
} from '@/common/api/plannerApi';
import { doc, updateDoc } from 'firebase/firestore';

interface ScheduleInfo {
  year: string;
  month: string;
  date: string;
}

// Date 정보를 문자열로 처리하는 메소드
export const dateToString = (calenderDate: Date): any => {
  const year = calenderDate.getFullYear().toString();
  const month =
    calenderDate.getMonth() + 1 < 10 // 1~9월 앞에 0 붙이기
      ? '0' + (calenderDate.getMonth() + 1)
      : calenderDate.getMonth() + 1;
  const date =
    calenderDate.getDate() < 10 // 1~9일 앞에 0 붙이기
      ? '0' + calenderDate.getDate().toString()
      : calenderDate.getDate().toString();
  return `${year}-${month}-${date}`;
};

// Date 정보를 문자열로 처리하는 메소드
export const dateToObject = (calenderDate: Date): any => {
  // 캘린더 데이트값 초기화 해야해서 object 타입으로 만듦
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

export const timeHandler = (when: { time: number }): any => {
  // console.log(when?.time);
  if (when?.time === 999) return '--:--';

  const floorForHour = Math.floor(when.time / 60);
  const floorForMinute = Math.floor(when.time % 60);

  const hour = floorForHour < 10 ? '0' + floorForHour : floorForHour;
  const minute = floorForMinute < 10 ? '0' + floorForMinute : floorForMinute;

  return `${hour}:${minute}`;
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

export const addWishList = async (wishList: any, event: any, uid: any) => {
  await updateDoc(doc(db, 'users', uid), {
    myWishPlace: [...wishList, { ...event }],
  });
};
export const popWishList = async (wishList: any, event: any, uid: any) => {
  const newWishList = wishList.filter(
    (item: any) => item.contentid !== event.contentid,
  );
  await updateDoc(doc(db, 'users', uid), {
    myWishPlace: newWishList,
  });
};
//일정 저장
export const addPlan = async (
  plan: any, // 만든 일정
  planName: string, // 만든 일정 이름
  uid: string, // 사용자 고유번호
  isShow: boolean, // 공개/비공개 처리
  isMine: boolean, // 내가만든건지 /북마크한 일정인지 확인
) => {
  const planList: any = await getUserPlanList(uid);
  const allPlanner: any = await getAllPlanner();

  const newMyPlanner = [
    {
      ...plan,
      name: planName,
      planUniqueId: planList['myPlanner'].length,
      isMine: isMine,
    },
    ...planList['myPlanner'],
  ];
  const newAllPlanner = [
    ...allPlanner['items'],
    {
      ...plan,
      name: planName,
      planUniqueId: planList['myPlanner'].length,
      uid: uid,
      isShow: isShow,
    },
  ];

  updateAllPlannerDB(newAllPlanner);
  updateUserDB(newMyPlanner, uid);
};

// 일정 수정
export const updatePlan = async (
  plan: any, //새 일정 데이터
  planName: string, // 바뀐 일정 제목
  uid: string, // 사용자 고유 번호
  planUniqueId: string, // 수정할 일정 데이터 번호
  isShow: boolean, // 공개/비공개 처리
  isMine: boolean,
) => {
  const planList: any = await getUserPlanList(uid);
  const allPlanner: any = await getAllPlanner();
  const newMyPlanner = planList['myPlanner'].reduce((sum: any, item: any) => {
    if (parseInt(planUniqueId) === item['planUniqueId']) {
      sum.push({ ...plan, name: planName, isMine: isMine });
    } else {
      sum.push(item);
    }
    return sum;
  }, []);

  const newAllPlanner = allPlanner['items'].reduce((sum: any, item: any) => {
    if (item.planUniqueId === parseInt(planUniqueId) && item.uid === uid) {
      sum.push({ ...plan, name: planName, uid: uid, isShow: isShow });
    } else {
      sum.push(item);
    }
    return sum;
  }, []);

  updateAllPlannerDB(newAllPlanner);
  updateUserDB(newMyPlanner, uid);
};

// 일정 삭제
export const popPlan = async (uid: string, planUniqueId: string) => {
  const planList: any = await getUserPlanList(uid);
  const allPlanner: any = await getAllPlanner();

  const newMyPlanner = planList['myPlanner'].reduce((sum: any, item: any) => {
    if (item.planUniqueId === parseInt(planUniqueId)) {
      sum.push({ ...item, isDelete: true });
    } else {
      sum.push(item);
    }
    return sum;
  }, []);

  const newAllPlanner = allPlanner['items'].reduce((sum: any, item: any) => {
    if (item.planUniqueId === parseInt(planUniqueId) && item.uid === uid) {
      sum.push({ ...item, isDelete: true });
    } else {
      sum.push(item);
    }
    return sum;
  }, []);

  updateAllPlannerDB(newAllPlanner);
  updateUserDB(newMyPlanner, uid);
};

export const saveOtherPlan = async (
  plan: any,
  planName: string,
  uid: string,
  userId: string,
  planUniqueId: string,
) => {
  // 사용자 일정에 추가
  await addPlan(plan, planName, uid, false, false);

  // planner 디비에 해당 일정데이터의 북마크 카운트 +1 하기

  const allPlanner: any = await getAllPlanner();
  const newAllPlanner = allPlanner['items']
    .reduce((sum: any, item: any) => {
      if (item.planUniqueId === parseInt(planUniqueId) && item.uid === userId) {
        sum.push({
          ...item,
          bookmarkCount: item.bookmarkCount + 1,
          isShow: true,
          uid: userId,
        });
      } else {
        sum.push(item);
      }

      return sum;
    }, [])
    .sort((a: any, b: any) => b?.bookmarkCount - a?.bookmarkCount);

  updateAllPlannerDB([...newAllPlanner]);
};
