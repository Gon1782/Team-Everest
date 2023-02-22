import {
  Authority,
  InitLocation,
  IsSidePageView,
  PickScheduleRecoil,
  PickScheduleType,
} from '@/recoil/atom/MyPlan';

import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

const ScheduleDate = ({
  planSchedule,
  scheduleDate,
  index,
}: {
  planSchedule: any;
  scheduleDate: any;
  index: number;
}) => {
  const setPickSchedule =
    useSetRecoilState<PickScheduleType>(PickScheduleRecoil);
  const authority = useRecoilValue(Authority);
  const resetInitLocation = useResetRecoilState(InitLocation);
  // 사이드창 display
  const setShowSideSection = useSetRecoilState(IsSidePageView);

  // 작업중인 일정카드에서 다른일정카드를 클릭했을때 맵 을 초기화 해줘야함
  const initMap = (scheduleInfo: string) => {
    resetInitLocation();
    setPickSchedule((prev) => {
      return {
        schedule: scheduleInfo,
        day: prev.day,
      };
    });
  };
  const onChangeSidePage = (index: number) => {
    setShowSideSection(true); // 사이드창 열고
    setPickSchedule((prev) => {
      const clonePrev = { ...prev };
      clonePrev.day = `Day${index + 1}`;
      clonePrev.schedule = planSchedule[index];
      return clonePrev;
    });
  };

  return (
    <>
      <div onClick={() => initMap(scheduleDate)}>
        Day{index + 1} |{scheduleDate}
      </div>
      {authority.write && (
        <button onClick={() => onChangeSidePage(index)}>일정 추가</button>
      )}
    </>
  );
};

export default ScheduleDate;
