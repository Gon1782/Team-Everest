import { useCallback, useState } from 'react';

// 내용 변경 커스텀훅
const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  const reset = useCallback(() => {
    setValue('');
  }, []);

  return [value, onChange, reset] as const;
};

export default useInput;
