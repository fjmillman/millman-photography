import type { FC, PropsWithChildren } from 'react';

import Overlay from '../Overlay';
import SidebarContent from './components/SidebarContent';
import SidebarFooter from './components/SidebarFooter';
import SidebarHeader from './components/SidebarHeader';

type Props = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  ariaLabel: string;
}>;

type SidebarComponent = FC<Props> & {
  Header: typeof SidebarHeader;
  Content: typeof SidebarContent;
  Footer: typeof SidebarFooter;
};

const Sidebar: SidebarComponent = ({ children, isOpen, onClose, ariaLabel }) => (
  <Overlay isOpen={isOpen} onClose={onClose} ariaLabel={ariaLabel}>
    <div className="flex-col p-10 bg-white fixed t-0 r-0 h-full w-80 shadow-sm overflow-y-auto rounded-sm">
      {children}
    </div>
  </Overlay>
);

Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Footer = SidebarFooter;

export default Sidebar;
