import type { FC, PropsWithChildren } from 'react';

const SidebarFooter: FC<PropsWithChildren> = ({ children }) => <div className="flex-shrink-0 mt-6">{children}</div>;

export default SidebarFooter;
