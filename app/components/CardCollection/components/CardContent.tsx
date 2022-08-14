import type { FC, PropsWithChildren } from 'react';

const CardContent: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col h-full justify-between p-4">{children}</div>
);

export default CardContent;
