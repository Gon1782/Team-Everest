import {
  Authority,
  IsCalenderView,
  NewPlanRecoil,
  PlanType,
} from '@/recoil/atom/MyPlan';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const StartEndDate = () => {
  const myPlan = useRecoilValue<PlanType | any>(NewPlanRecoil);
  const setIsShowCalender = useSetRecoilState(IsCalenderView);
  const authority = useRecoilValue(Authority);
  return (
    <PlanDate>
      {authority.write && (
        <FaRegCalendarAlt
          size={25}
          onClick={() => setIsShowCalender((prev) => !prev)}
        />
      )}

      <Date>
        <p>
          {myPlan?.startDate['yyyymmdd']} - {myPlan?.endDate['yyyymmdd']}
        </p>
      </Date>
    </PlanDate>
  );
};

export default StartEndDate;

const PlanDate = styled.div`
  margin-bottom: 10px;
  display: block;
  & > p {
    font-size: 25px;
  }
  text-align: center;
  height: 30px;
`;
const Date = styled.div`
  border-bottom: 1px solid gray;
  & > p {
    font-size: 30px;
  }
`;
const showCalender = styled.button`
  height: 25px;
`;
