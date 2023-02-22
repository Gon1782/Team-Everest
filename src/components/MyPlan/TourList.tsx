import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  NewPlanRecoil,
  PlanType,
  PickScheduleRecoil,
  TourListRecoil,
  MyWishList,
} from '@/recoil/atom/MyPlan';
import { useEffect, useRef, useState } from 'react';
import { getTourList } from '@/common/api/tourApi';

const TourList = () => {
  const setNewPlan = useSetRecoilState<PlanType>(NewPlanRecoil);

  // 선택한 일정
  const pickSchedule = useRecoilValue(PickScheduleRecoil);
  // 보여줄 데이터
  const [dataList, setDataList] = useState<any>([]);
  // 관광지 데이터
  const tourList = useRecoilValue(TourListRecoil);
  //관광지 위시 리스트 데이터
  const myWishList = useRecoilValue(MyWishList);
  //관광지 위시 리스트만 보기
  const [isShowMyWish, setIsShowMyWish] = useState(false);

  // 추가한 관광지 데이터를 선택한 일정 리스트에 담기
  const eventHandler = (item: any) => {
    setNewPlan((prev: PlanType) => {
      const clonePrev = { ...prev.schedule }; // 기존 데이터 복사
      const cloneItem = { ...item };
      /* 선택한 관광지 데이터에 시간과 메모를 사용자가 사용 할 수 있게 데이터를 초기화*/
      cloneItem['when'] = { time: 999, amPm: '언제' }; // 시간
      cloneItem['memo'] = ''; // 메모
      /*----------------------------------------------------------*/
      const newPlan: any = {};
      const newEvents = [...clonePrev[pickSchedule.schedule], cloneItem];
      newPlan[pickSchedule.schedule] = newEvents;
      return {
        ...prev,
        schedule: { ...prev.schedule, ...newPlan },
      };
    });
  };

  useEffect(() => {
    if (isShowMyWish) {
      setDataList(myWishList);
    } else {
      setDataList(tourList);
    }
  }, [isShowMyWish]);

  useEffect(() => {
    setDataList(tourList);
    setIsShowMyWish(false);
  }, [tourList]);

  return (
    <div>
      <input
        type="checkbox"
        checked={isShowMyWish}
        onChange={() => setIsShowMyWish((prev) => !prev)}
      />
      저장한 장소만 보기
      {!!dataList?.length &&
        dataList.map((item: any, index: number) => {
          return (
            <div key={index} style={{ height: 150 }}>
              {/* <img src={item.fisrtImage} width="50" height="50"></img> */}
              <div>{item.title}</div>
              <div>{item.tel}</div>
              <button onClick={() => eventHandler(item)}>+</button>
            </div>
          );
        })}
    </div>
  );
};

export default TourList;
