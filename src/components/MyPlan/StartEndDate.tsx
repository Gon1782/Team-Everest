import {
  Authority,
  IsCalenderView,
  NewPlanRecoil,
  PlanType,
} from '@/recoil/atom/MyPlan';
import { FaRegCalendarAlt } from 'react-icons/fa';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { PlanBtn } from './style/common';

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
        <FaRegCalendarAlt
          size={20}
          onClick={() => setIsShowCalender((prev) => !prev)}
        />
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
  border-bottom: 1px solid gray;
  height: 30px;
`;
const showCalender = styled.button`
  height: 25px;
`;
