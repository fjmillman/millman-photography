import { FC } from 'react';

const RowContent: FC = ({ children }) => (
  <div className="row-content">
    {children}
    <style jsx>{`
      .row-content {
        max-width: var(--screen-lg);
        margin: auto;
        padding: var(--size-12);
        display: flex;
        flex-direction: column;
      }
    `}</style>
  </div>
);

export default RowContent;
