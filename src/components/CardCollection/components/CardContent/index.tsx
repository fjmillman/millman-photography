import { FC } from 'react';

const CardContent: FC = ({ children }) => (
  <div className="card-content">
    {children}
    <style jsx>{`
      .card-content {
        display: flex;
        height: var(--size-full);
        flex-direction: column;
        justify-content: space-between;
        padding: var(--size-4);
      }
    `}</style>
  </div>
);

export default CardContent;
