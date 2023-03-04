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
  useEffect(() => {
    //console.log(scheduleRef.current[index]);
  }, []);

  return (
    <div
      ref={(el) =>
        // !!scheduleRef.current[index] ? (scheduleRef.current[index] = el) : false
        (scheduleRef.current[index] = el)
      }
    >
      <PlanDateWrapper onClick={() => initMap(scheduleDate)}>
        <div style={{ position: 'absolute', top: '8.5%', left: '39.5%' }}>
          {/* <PlanDateCount>Day{index + 1} </PlanDateCount> */}
          <img
            src={`https://img.icons8.com/color/48/null/calendar-${
              index + 1
            }.png`}
            width={50}
            height={50}
          ></img>
          <PlanDate>{scheduleDate}</PlanDate>
        </div>
      </PlanDateWrapper>

      {authority.write && (
        <AddPlanBtnWapper>
          <AddPlanBtn onClick={() => onChangeSidePage(index)}>
            일정 추가
          </AddPlanBtn>
        </AddPlanBtnWapper>
      )}
    </div>
  );
};

export default ScheduleDate;

const PlanDateWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: block;
  align-items: center;
  margin: 30px auto;
  color: black;
  background-color: white;
  border-radius: 100px;
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
  width: 100px;
  margin: 0 auto;
  text-align: center;
  padding: 5px 8px;
  margin: 0 auto 30px auto;
  /* border-bottom: 1px inset; */
  /* border-bottom: 1px solid #2c2c2c; */
`;

const AddPlanBtn = styled.button`
  width: 80px;
  height: 28px;
  font-size: 0.75rem;
  background-color: #3f72af;
  color: #f3f3f3;
  border-radius: 50px;
`;
