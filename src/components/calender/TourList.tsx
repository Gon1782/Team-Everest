import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  MyPlanRecoil,
  PlanType,
  PickScheduleRecoil,
  TourListRecoil,
} from '@/recoil/atom/MyPlan';

const TourList = () => {
  const setNewPlan = useSetRecoilState<PlanType>(MyPlanRecoil);

  // 선택한 일정
  const pickSchedule = useRecoilValue(PickScheduleRecoil);
  // 관광지 데이터
  const tourDataList = useRecoilValue(TourListRecoil);

  // 추가한 관광지 데이터를 선택한 일정 리스트에 담기
  const eventHandler = (item: any) => {
    setNewPlan((prev: PlanType) => {
      const clonePrev = { ...prev.schedule };
      const newPlanEvents = [...clonePrev[pickSchedule.schedule], item];
      const newPlan: any = {};
      newPlan[pickSchedule.schedule] = newPlanEvents;
      return {
        name: prev.name,
        schedule: { ...prev.schedule, ...newPlan },
        startDate: { ...prev.startDate },
        endDate: { ...prev.endDate },
      };
    });
  };
  return (
    <div>
      {!!tourDataList?.length &&
        tourDataList.map((item: any, index: number) => {
          return (
            <div key={index}>
              <img src={item.fisrtImage} width="50" height="50"></img>
              <div>{item.title}</div>
              <div>{item.tel}</div>
              <div>{item.mapx}</div>
              <div>{item.mapy}</div>
              <button onClick={() => eventHandler(item)}>+</button>
            </div>
          );
        })}
    </div>
  );
};

export default TourList;
