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
    <div style={{ width: '100%' }}>
      <MemoInput
        style={{ width: '80%', resize: 'none', marginTop: '5px', fontSize: 14 }}
        placeholder="메모할 내용을 적으세요"
        onChange={(e) => setMemo(e.target.value)}
        value={`${memo}`}
      />
    </div>
  );
};

export default EventMemo;

const MemoInput = styled.input`
  text-align: center;
  font-family: 'emoji';
  border-radius: 10px;
  outline: none;
`;
