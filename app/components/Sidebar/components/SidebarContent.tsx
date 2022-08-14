import type { FC, PropsWithChildren } from 'react';

const SidebarContent: FC<PropsWithChildren> = ({ children }) => <div className="flex-grow">{children}</div>;

export default SidebarContent;
