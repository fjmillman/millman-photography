import { FC } from 'react';

import Overlay from '../../Overlay';
import ModalHeader from './components/ModalHeader';
import ModalContent from './components/ModalContent';
import ModalFooter from './components/ModalFooter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ariaLabel: string;
}

type ModalComponent = FC<Props> & {
  Header: typeof ModalHeader;
  Content: typeof ModalContent;
  Footer: typeof ModalFooter;
};

const Modal: ModalComponent = ({ children, isOpen, onClose, ariaLabel }) => (
  <Overlay isOpen={isOpen} onClose={onClose} ariaLabel={ariaLabel}>
    <div className="modal">
      {children}
      <style jsx>{`
        .modal {
          display: flex;
          flex-direction: column;
          padding: var(--spacing-10);
          background-color: white;
          position: fixed;
          top: var(--size-0);
          left: var(--size-0);
          height: var(--size-full);
          width: var(--size-full);
          box-shadow: 0 var(--size-4) var(--size-12) rgba(0, 0, 0, 0.2);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          border-radius: var(--size-1);
        }

        @media screen and (min-width: 640px) {
          .modal {
            top: var(--size-half);
            left: var(--size-half);
            right: var(--size-0);
            transform: translate(-50%, -50%);
            height: var(--size-auto);
            max-height: var(--size-half);
            max-width: var(--size-96);
          }
        }
      `}</style>
    </div>
  </Overlay>
);

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
