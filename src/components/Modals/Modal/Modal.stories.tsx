import { useState } from 'react';

import Modal from '.';

export default {
  title: 'Components/Modals/Modal',
  component: Modal,
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal isOpen={isOpen} onClose={handleClose} ariaLabel="Modal">
        <Modal.Header>This is the modal header</Modal.Header>
        <Modal.Content>This is the modal content</Modal.Content>
        <Modal.Footer>This is the modal footer</Modal.Footer>
      </Modal>
    </>
  );
};
