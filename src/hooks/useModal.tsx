import { useState, useCallback } from 'react';

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

  return [modal, openModal, closeModal, closeModalIfClickOutside] as const;
};

export default useModal;
