import { useState } from "react";

const useModal = (initIsOpen: boolean = false): {
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
} => {
  const [modalIsOpen, setIsOpen] = useState(initIsOpen);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return {
    modalIsOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
