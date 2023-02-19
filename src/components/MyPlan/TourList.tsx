import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  NewPlanRecoil,
  PlanType,
  PickScheduleRecoil,
  TourListRecoil,
} from '@/recoil/atom/MyPlan';

const TourList = () => {
  const setNewPlan = useSetRecoilState<PlanType>(NewPlanRecoil);

  // 선택한 일정
  const pickSchedule = useRecoilValue(PickScheduleRecoil);
  // 관광지 데이터
  const tourDataList = useRecoilValue(TourListRecoil);

  // 추가한 관광지 데이터를 선택한 일정 리스트에 담기
  const eventHandler = (item: any) => {
    setNewPlan((prev: PlanType) => {
      const clonePrev = { ...prev.schedule }; // 기존 데이터 복사
      const cloneItem = { ...item };
      /* 선택한 관광지 데이터에 시간과 메모를 사용자가 사용 할 수 있게 데이터를 초기화*/
      cloneItem['time'] = ''; // 시간
      cloneItem['memo'] = ''; // 메모
      /*----------------------------------------------------------*/
      const newEvents = [...clonePrev[pickSchedule.schedule], cloneItem];
      const newPlan: any = {};

      newPlan[pickSchedule.schedule] = newEvents;

      return {
        name: prev.name,
        schedule: { ...prev.schedule, ...newPlan },
        startDate: prev.startDate,
        endDate: prev.endDate,
      };
    });
  };
  return (
    <div>
      {!!tourDataList?.length &&
        tourDataList.map((item: any, index: number) => {
          return (
            <div key={index}>
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
