import { category } from '@/common/utils/cat3';
import { Item } from '@/types/DetailType';
import { useCallback } from 'react';

const useRandomPage = () => {
  const page = useCallback((cat: string) => {
    const pageNo = Math.floor(Math.random() * (category[cat] + 1));

    return { pageNo };
  }, []);

  return page;
};

export default useRandomPage;
