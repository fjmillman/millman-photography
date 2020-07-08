import { useState } from 'react';

const useSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return {
    state: { isSidebarOpen },
    actions: {
      handleOpenSidebar,
      handleCloseSidebar,
    },
  };
};

export default useSidebar;
