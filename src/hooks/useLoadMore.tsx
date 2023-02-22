import { useState } from 'react';
import { Document } from '@/types/DetailType';

const useLoadMore = (list: Document) => {
  const [idx, setIdx] = useState(2);

  const checkEnd = !!list ? list.length - 1 <= idx : true;

  const LoadMore = () => {
    if (!checkEnd) {
      setIdx(idx + 3);
    }
  };

  return [idx, checkEnd, LoadMore] as const;
};

export default useLoadMore;
