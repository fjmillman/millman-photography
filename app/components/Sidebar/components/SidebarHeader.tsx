import type { FC, PropsWithChildren } from 'react';

const SidebarHeader: FC<PropsWithChildren> = ({ children }) => <div className="flex-grow mb-6">{children}</div>;

export default SidebarHeader;
