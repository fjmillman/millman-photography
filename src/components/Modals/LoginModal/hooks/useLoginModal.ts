import { useState } from 'react';

const useLoginModal = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);

  return {
    state: { isLoginModalOpen },
    actions: {
      handleOpenLoginModal,
      handleCloseLoginModal,
    },
  };
};

export default useLoginModal;
