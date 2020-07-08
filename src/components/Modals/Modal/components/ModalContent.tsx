import { FC } from 'react';

const ModalContent: FC = ({ children }) => (
  <div className="modal-content">
    {children}
    <style jsx>{`
      .modal-content {
        flex-grow: 1;
      }
    `}</style>
  </div>
);

export default ModalContent;
