import {
  Authority,
  InitLocation,
  IsSidePageView,
  PickScheduleRecoil,
  PickScheduleType,
} from '@/recoil/atom/MyPlan';
import { useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { BsFlagFill } from 'react-icons/bs';

const ScheduleDate = ({
  planSchedule,
  scheduleDate,
  index,
  scheduleRef,
}: {
  planSchedule: any;
  scheduleDate: any;
  index: number;
  scheduleRef: any;
}) => {
  const nodeRef = useRef(null);

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
    setShowSideSection(() => {
      window.scrollTo(0, 0);
      return true;
    }); // 사이드창 열고
    setPickSchedule((prev) => {
      //사이드창에 보내기
      const clonePrev = { ...prev };
      clonePrev.day = `Day${index + 1}`;
      clonePrev.schedule = planSchedule[index];
      return clonePrev;
    });
  };
  useEffect(() => {}, []);

  return (
    <div
      ref={(el) => (scheduleRef.current[index] = el)}
      style={{ display: 'block', margin: '10px 0 25px 0' }}
    >
      <PlanDateWrapper onClick={() => initMap(scheduleDate)}>
        <img
          src={require('@/assets/marker2.png').default}
          style={{ width: 40, height: 40 }}
        />

        <PlanDate>{scheduleDate}</PlanDate>
      </PlanDateWrapper>
      {authority.write && (
        <AddPlanBtnWapper onClick={() => onChangeSidePage(index)}>
          <BsFlagFill size={12} color={'#EB455F'} />

          <AddPlanBtn>일정 추가</AddPlanBtn>
        </AddPlanBtnWapper>
      )}
    </div>
  );
};

export default ScheduleDate;

const PlanDateWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: block;
  align-items: center;
  color: black;
  cursor: pointer;
`;

// 일정의 일일 표기
const PlanDateCount = styled.p`
  font-size: 20px;
`;

// 일정 날짜
const PlanDate = styled.p`
  font-size: 15px;
  color: black;
`;

// 일정 추가 버튼 영역
const AddPlanBtnWapper = styled.div`
  width: 100%;
  display: block;
  cursor: pointer;
`;

const AddPlanBtn = styled.button`
  font-size: 0.75rem;
  background-color: #f1f6f9;
  color: grey;

  border-radius: 50px;
`;
