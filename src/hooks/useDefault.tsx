import {
  defaultBackImage,
  defaultImage,
  defaultIntro,
  defaultProfile,
  defaultImage2,
} from '@/common/utils/defaults';
import { useCallback } from 'react';

const useDefault = () => {
  const defaults = useCallback(() => {
    return {
      defaultImage,
      defaultImage2,
      defaultIntro,
      defaultProfile,
      defaultBackImage,
    };
  }, []);

  return defaults;
};

export default useDefault;
