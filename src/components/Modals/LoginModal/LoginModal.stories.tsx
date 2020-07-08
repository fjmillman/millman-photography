import { useState } from 'react';

import withRedux from '../../../../.storybook/decorators/withRedux';
import { createStore } from '../../../store';

import LoginModal from '.';

const store = createStore();

export default {
  title: 'Components/Modals/Login Modal',
  component: LoginModal,
  decorators: [withRedux(store)],
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button type="button" onClick={handleOpen}>
        Open Login Modal
      </button>
      <LoginModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
