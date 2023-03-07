import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <NotFountSection>
      <NotFoundImage src={require('@/assets/404_page.jpg').default} />
      <NotFoundAlarm>
        <NotFoundAlarmText>길을 잃었어요!</NotFoundAlarmText>
        <NotFoundNavBtn onClick={() => navigate('/main')}>
          셰르파와 함께 돌아가요!
        </NotFoundNavBtn>
      </NotFoundAlarm>
    </NotFountSection>
  );
};

export default NotFound;

const NotFountSection = styled.div`
  width: 80%;
  height: 100%;
  margin: 5% auto;
  position: relative;
`;

const NotFoundImage = styled.img`
  width: 100%;
  height: 100%;
`;

const NotFoundAlarm = styled.div`
  display: inline-grid;
  position: absolute;
  width: 100%;
  height: 25%;
  top: 30%;
  left: 50%;
`;

const NotFoundAlarmText = styled.h1`
  font-size: 45px;
  color: #343a40;
`;

const NotFoundNavBtn = styled.button`
  font-size: 15px;

  background-color: orange;
  width: 200px;
  height: 40px;
  border-radius: 20px;
`;
