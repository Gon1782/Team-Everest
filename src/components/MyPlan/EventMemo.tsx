import {
  MemoAndTime,
  NewPlanRecoil,
  PlanType,
  WhichEvent,
} from '@/recoil/atom/MyPlan';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const EventMemo = () => {
  const newPlan = useRecoilValue<PlanType>(NewPlanRecoil);
  const { date, index, isOpen } = useRecoilValue(WhichEvent);

  const [{ memo }, setMemo] = useRecoilState(MemoAndTime);

  useEffect(() => {
    if (isOpen) {
      // 드롭다운박스 열리면 메모 셋팅하기
      setMemo((prev) => {
        const eventMemo = newPlan.schedule[date][index]['memo'];
        return {
          ...prev,
          memo: eventMemo,
        };
      });
    }
  }, [isOpen]);

  return (
    <div style={{ width: '100%' }}>
      <textarea
        style={{ width: '80%', resize: 'none', marginTop: '5px' }}
        placeholder="메모할 내용을 적으세요"
        onChange={(e) =>
          setMemo((prev) => {
            return {
              ...prev,
              memo: e.target.value,
            };
          })
        }
        value={memo}
      />
    </div>
  );
};

export default EventMemo;
