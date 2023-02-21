import { MemoAndTime } from '@/recoil/atom/MyPlan';

import { useSetRecoilState } from 'recoil';

const EventMemo = () => {
  const setMemo = useSetRecoilState(MemoAndTime);

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
      />
    </div>
  );
};

export default EventMemo;
