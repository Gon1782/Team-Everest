import {
  Authority,
  IsCalenderView,
  NewPlanRecoil,
  PlanType,
} from '@/recoil/atom/MyPlan';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const StartEndDate = () => {
  const myPlan = useRecoilValue<PlanType | any>(NewPlanRecoil);
  const setIsShowCalender = useSetRecoilState(IsCalenderView);
  const authority = useRecoilValue(Authority);
  return (
    <PlanDate>
      <p>
        {myPlan?.startDate['yyyymmdd']} - {myPlan?.endDate['yyyymmdd']}
      </p>
      {authority.write && (
        <button onClick={() => setIsShowCalender((prev) => !prev)}>
          캘린더 아이콘
        </button>
      )}
    </PlanDate>
  );
};

export default StartEndDate;

const PlanDate = styled.div`
  display: flex;
  & > p {
    font-size: 25px;
  }
`;
const showCalender = styled.button`
  height: 25px;
`;
