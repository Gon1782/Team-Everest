import { useState, useCallback, useEffect } from 'react';

const useModal = () => {
  const [modal, setModal] = useState(false);

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

  // 모달 시 스크롤 방지
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

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
