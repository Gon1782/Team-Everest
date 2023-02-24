import {
  MemoAndTime,
  NewPlanRecoil,
  PlanType,
  WhichEvent,
} from '@/recoil/atom/MyPlan';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const EventMemo = ({ memo, setMemo }: { memo: string; setMemo: any }) => {
  return (
    <div style={{ width: '100%' }}>
      <input
        style={{ width: '80%', resize: 'none', marginTop: '5px' }}
        placeholder="메모할 내용을 적으세요"
        onChange={(e) => setMemo(e.target.value)}
        value={`${memo}`}
      />
    </div>
  );
};

export default EventMemo;
