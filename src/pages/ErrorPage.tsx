import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Error = () => {
  const navigate = useNavigate();
  return (
    <ErrorSection>
      <ErrorImage src={require('@/assets/404_page.webp').default} />
      <ErrorAlarm>
        <ErrorAlarmText>잠시후에 이용해주세요!</ErrorAlarmText>
        <ErrorNavBtn onClick={() => navigate('/main')}>
          셰르파와 함께 돌아가요!
        </ErrorNavBtn>
      </ErrorAlarm>
    </ErrorSection>
  );
};

export default Error;

const ErrorSection = styled.div`
  width: 80%;
  height: 100%;
  margin: 5% auto;
  position: relative;
`;

const ErrorImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ErrorAlarm = styled.div`
  display: inline-grid;
  position: absolute;
  width: 100%;
  height: 25%;
  top: 30%;
  left: 50%;
`;

const ErrorAlarmText = styled.h1`
  font-size: 45px;
`;

const ErrorNavBtn = styled.button`
  font-size: 15px;

  background-color: orange;
  width: 200px;
  height: 40px;
  border-radius: 15px;
`;
