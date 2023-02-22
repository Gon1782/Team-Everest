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
    <div>
      <input
        placeholder="메모할 내용을 적으세요"
        type="text"
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
