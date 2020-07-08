import { FC } from 'react';

const SidebarContent: FC = ({ children }) => (
  <div className="sidebar-content">
    {children}
    <style jsx>{`
      .sidebar-content {
        flex-grow: 1;
      }
    `}</style>
  </div>
);

export default SidebarContent;
