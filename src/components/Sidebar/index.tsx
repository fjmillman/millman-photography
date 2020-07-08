import { FC } from 'react';

import Overlay from '../Overlay';
import SidebarHeader from './components/SidebarHeader';
import SidebarContent from './components/SidebarContent';
import SidebarFooter from './components/SidebarFooter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ariaLabel: string;
}

type SidebarComponent = FC<Props> & {
  Header: typeof SidebarHeader;
  Content: typeof SidebarContent;
  Footer: typeof SidebarFooter;
};

const Sidebar: SidebarComponent = ({
  children,
  isOpen,
  onClose,
  ariaLabel,
}) => (
  <Overlay isOpen={isOpen} onClose={onClose} ariaLabel={ariaLabel}>
    <div className="sidebar">
      {children}
      <style jsx>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          padding: var(--spacing-10);
          background-color: white;
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          width: var(--size-80);
          box-shadow: 0 var(--size-4) var(--size-12) rgba(0, 0, 0, 0.2);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          border-radius: var(--size-2) 0 0 var(--size-2);
        }
      `}</style>
    </div>
  </Overlay>
);

Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Footer = SidebarFooter;

export default Sidebar;
