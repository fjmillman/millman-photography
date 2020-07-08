import { FC } from 'react';

const SidebarHeader: FC = ({ children }) => (
  <div className="sidebar-header">
    {children}
    <style jsx>{`
      .sidebar-header {
        flex-grow: 1;
        margin-bottom: var(--spacing-6);
      }
    `}</style>
  </div>
);

export default SidebarHeader;
