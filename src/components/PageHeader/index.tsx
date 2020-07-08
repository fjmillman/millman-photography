import { FC } from 'react';

interface Props {
  title: string;
}

const PageHeader: FC<Props> = ({ children, title }) => (
  <div>
    <h1>{title}</h1>
    {children}
    <style jsx>{`
      div {
        margin-bottom: var(--size-12);
        z-index: 100;
      }

      h1 {
        font-size: var(--size-8);
        font-weight: bold;
      }
    `}</style>
  </div>
);

export default PageHeader;
