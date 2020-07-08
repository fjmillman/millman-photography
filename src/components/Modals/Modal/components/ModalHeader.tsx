import { FC } from 'react';

const ModalHeader: FC = ({ children }) => (
  <div className="modal-header">
    {children}
    <style jsx>{`
      .modal-header {
        flex-grow: 1;
        margin-bottom: var(--spacing-6);
      }
    `}</style>
  </div>
);

export default ModalHeader;
