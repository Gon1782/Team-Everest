import { useCallback, useState } from 'react';
import { resizeFile } from './useImageInput';

// 이미지 여러개일때 인풋
const useImageInputs = (initialArray: string[]) => {
  const [image, setImage] = useState(initialArray);

  const onImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files !== null) {
        const file = e.target.files[0];
        const newImage = await resizeFile(file);
        if (typeof newImage === 'string') {
          setImage([...image, newImage]);
        }
      }
    },
    [image],
  );

  const reset = useCallback(() => {
    setImage([]);
  }, []);

  return [image, onImageChange, reset] as const;
};

export default useImageInputs;
