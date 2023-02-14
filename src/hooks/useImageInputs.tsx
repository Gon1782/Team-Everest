import { useCallback, useState } from 'react';

// 이미지 여러개일때 인풋
const useImageInputs = () => {
  const [image, setImage] = useState<string[]>([]);

  const onImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files !== null) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            console.log([...image, reader.result]);
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
