import {
  MemoAndTime,
  NewPlanRecoil,
  PlanType,
  WhichEvent,
} from '@/recoil/atom/MyPlan';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

const EventMemo = ({ memo, setMemo }: { memo: string; setMemo: any }) => {
  return (
    <MemoInputWrapper>
      <MemoInput
        placeholder="메모할 내용을 10자내로 적으세요."
        onChange={(e) => setMemo(e.target.value)}
        value={`${memo}`}
        maxLength={10}
      />
    </MemoInputWrapper>
  );
};

export default EventMemo;

const MemoInputWrapper = styled.div`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const MemoInput = styled.input`
  width: 80%;
  height: 24px;
  padding: 5px;
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
  font-family: 'emoji';
  border-radius: 10px;
  outline: none;
  ::placeholder {
    font-size: 14px;
  }
`;
