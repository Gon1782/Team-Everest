import { useCallback, useState } from 'react';

// 이미지 여러개일때 인풋
const useImageInputs = (initialArray: string[]) => {
  const [image, setImage] = useState(initialArray);

  const onImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files !== null) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImage([...image, reader.result]);
          }
        };
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
