import { useState } from 'react';
import { Document } from '@/types/DetailType';

const useLoadMore = (
  list: Document,
  initialIndex: number = 2,
  numberToload?: number,
) => {
  const [idx, setIdx] = useState(initialIndex);

  const checkEnd = !!list ? list.length - 1 <= idx : true;
  const nextIdx = !!numberToload
    ? numberToload
    : list?.length - 1 - initialIndex;

  const LoadMore = () => {
    if (!checkEnd) {
      setIdx(idx + nextIdx);
    }
  };

  return [idx, checkEnd, LoadMore] as const;
};

export default useLoadMore;
