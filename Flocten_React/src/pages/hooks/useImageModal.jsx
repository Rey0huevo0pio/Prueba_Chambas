import { useState } from "react";

const useImageModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return { modalOpen, selectedImage, openModal, closeModal };
};

export default useImageModal;