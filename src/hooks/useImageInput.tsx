import Resizer from 'react-image-file-resizer';
import { useCallback, useState } from 'react';

export const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      768,
      512,
      'WEBP',
      75,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64',
    );
  });

// 이미지 변경 커스텀훅
const useImageInput = (initialState: string) => {
  const [img, setImg] = useState(initialState);

  const onImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files !== null) {
        const file = e.target.files[0];
        const image = await resizeFile(file);
        if (typeof image === 'string') {
          setImg(image);
        }
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
