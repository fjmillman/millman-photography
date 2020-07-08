import { useState } from 'react';

import Sidebar from '.';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button type="button" onClick={handleOpen}>
        Open Sidebar
      </button>
      <Sidebar isOpen={isOpen} onClose={handleClose} ariaLabel="Sidebar">
        <Sidebar.Header>This is the sidebar header</Sidebar.Header>
        <Sidebar.Content>This is the sidebar content</Sidebar.Content>
        <Sidebar.Footer>This is the sidebar footer</Sidebar.Footer>
      </Sidebar>
    </>
  );
};
