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

const DateAndArea = () => {
  const myPlan = useRecoilValue<PlanType | any>(NewPlanRecoil);
  const setIsShowCalender = useSetRecoilState(IsCalenderView);
  const authority = useRecoilValue(Authority);
  return (
    <PlanDate>
      {authority.write ? (
        <>
          <div
            style={{
              display: 'flex',
              width: 110,
              margin: '0 auto',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => setIsShowCalender((prev) => !prev)}
          >
            <img
              src={'https://img.icons8.com/color/48/null/calendar--v1.png'}
              style={{
                cursor: 'pointer',
                width: 30,
                height: 30,
                marginRight: 5,
              }}
            />
            <p style={{ color: '##333333' }}>날짜 입력</p>
          </div>
          <Date>
            {myPlan?.startDate['yyyymmdd']} - {myPlan?.endDate['yyyymmdd']}
          </Date>
        </>
      ) : (
        // <>
        //   <BsFlagFill size={30} color={'#E8F1F5'} />
        //   <BsFlagFill size={30} color={'#DBE2EF'} />
        //   <BsFlagFill size={30} color={'#004A7C'} />
        //   <BsFlagFill size={30} color={'#FBE0C4'} />
        //   <BsFlagFill size={30} color={'orange'} />
        //   <BsFlagFill size={30} color={'#D8D2CB'} />

        <Date>
          {myPlan?.startDate['yyyymmdd']} - {myPlan?.endDate['yyyymmdd']}
        </Date>

        // </>
      )}
    </PlanDate>
  );
};

export default DateAndArea;

const PlanDate = styled.div`
  display: block;
  /* & > p {
    font-size: 25px;
  } */
  text-align: center;
  height: 80px;
`;
const Date = styled.p`
  font-size: 22px;
  margin-top: 12px;
  color: gray;
`;
const showCalender = styled.button`
  height: 25px;
`;
