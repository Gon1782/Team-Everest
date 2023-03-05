import {
  Authority,
  IsCalenderView,
  NewPlanRecoil,
  PlanType,
} from '@/recoil/atom/MyPlan';
import { BsFlagFill } from 'react-icons/bs';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const StartEndDate = () => {
  const myPlan = useRecoilValue<PlanType | any>(NewPlanRecoil);
  const setIsShowCalender = useSetRecoilState(IsCalenderView);
  const authority = useRecoilValue(Authority);
  return (
    <PlanDate>
      {authority.write ? (
        <img
          src={'https://img.icons8.com/color/48/null/calendar--v1.png'}
          onClick={() => setIsShowCalender((prev) => !prev)}
          style={{ cursor: 'pointer', width: 30, height: 30 }}
        />
      ) : (
        <>
          <BsFlagFill size={30} color={'#E8F1F5'} />
          <BsFlagFill size={30} color={'#DBE2EF'} />
          <BsFlagFill size={30} color={'#004A7C'} />
          <BsFlagFill size={30} color={'#FBE0C4'} />
          <BsFlagFill size={30} color={'orange'} />
          <BsFlagFill size={30} color={'#D8D2CB'} />
        </>
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
  /* border-bottom: 1px solid gray; */
  & > p {
    font-size: 30px;
    color: black;
  }
`;
const showCalender = styled.button`
  height: 25px;
`;
