import {
  defaultBackImage,
  defaultImage,
  defaultIntro,
  defaultProfile,
} from '@/common/utils/defaults';
import { useCallback } from 'react';

const useDefault = () => {
  const defaults = useCallback(() => {
    return { defaultImage, defaultIntro, defaultProfile, defaultBackImage };
  }, []);

  return defaults;
};

export default useDefault;
