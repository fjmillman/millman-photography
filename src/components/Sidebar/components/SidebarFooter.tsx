import { FC } from 'react';

const SidebarFooter: FC = ({ children }) => (
  <div className="sidebar-footer">
    {children}
    <style jsx>{`
      .sidebar-footer {
        flex-shrink: 0;
        margin-top: var(--spacing-6);
      }
    `}</style>
  </div>
);

export default SidebarFooter;
