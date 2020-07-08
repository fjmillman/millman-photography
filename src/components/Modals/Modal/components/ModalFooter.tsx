import { FC } from 'react';

const ModalFooter: FC = ({ children }) => (
  <div className="modal-footer">
    {children}
    <style jsx>{`
      .modal-footer {
        flex-shrink: 0;
        margin-top: var(--spacing-6);
      }
    `}</style>
  </div>
);

export default ModalFooter;
