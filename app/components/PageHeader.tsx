import type { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title: string;
}>;

const PageHeader: FC<Props> = ({ children, title }) => (
  <div className="mb-12 z-100">
    <h1 className="text-xl font-bold">{title}</h1>
    {children}
  </div>
);

export default PageHeader;
