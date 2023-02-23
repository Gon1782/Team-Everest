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
    <div>
      <input
        placeholder="메모할 내용을 적으세요"
        type="text"
        onChange={(e) => setMemo(e.target.value)}
        value={memo}
      />
    </div>
  );
};

export default EventMemo;
