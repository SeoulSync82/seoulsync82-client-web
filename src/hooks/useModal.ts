import { useState } from 'react';

export default function useModal() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
