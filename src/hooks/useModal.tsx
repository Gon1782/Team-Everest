import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useModal = () => {
  const [modal, setModal] = useState(false);
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  const openModal = useCallback(() => {
    setModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const closeModalIfClickOutside = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    },
    [],
  );

  const disableScroll = () => {
    window.onscroll = () => {
      window.scrollTo(scrollLeft, scrollTop);
    };
  };

  const enableScroll = () => {
    window.onscroll = () => {};
  };

  useEffect(() => {
    if (modal) {
      disableScroll();
    }
    if (!modal) {
      enableScroll();
    }
  }, [modal]);

  useEffect(() => {
    return () => {
      enableScroll();
    };
  }, []);

  return [modal, openModal, closeModal, closeModalIfClickOutside] as const;
};

export default useModal;
