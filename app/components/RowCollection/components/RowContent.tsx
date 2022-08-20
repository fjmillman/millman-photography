import type { FC, PropsWithChildren } from 'react';

const RowContent: FC<PropsWithChildren> = ({ children }) => (
  <div className="max-w-screen-lg m-auto p-12 flex flex-col">{children}</div>
);

export default RowContent;
