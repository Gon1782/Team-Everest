import { useEffect, useState } from 'react';

type Debounce = {
  value: string;
  delay?: number | undefined;
};

const useDebounce = (value: any, delay = 500) => {
  const [debounceVal, setDebounceVal] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceVal;
};

export default useDebounce;
