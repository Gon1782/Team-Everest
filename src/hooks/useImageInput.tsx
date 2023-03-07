import { useCallback, useState } from 'react';

// 이미지 변경 커스텀훅
const useImageInput = (initialState: string) => {
  const [img, setImg] = useState(initialState);

  const onImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files !== null) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImg(reader.result);
          }
        };
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setImg('');
  }, []);

  return [img, onImageChange, reset] as const;
};

export default useImageInput;
