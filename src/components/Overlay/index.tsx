import {
  Children,
  cloneElement,
  SetStateAction,
  FunctionComponentElement,
  FC,
} from 'react';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';

import useOverlay from './hooks/useOverlay';
import CloseButton from './components/CloseButton';

interface Props {
  children: FunctionComponentElement<JSX.IntrinsicElements['div']>;
  isOpen: boolean;
  onClose: () => void;
  ariaLabel: string;
}

const Overlay: FC<Props> = ({ children, isOpen, onClose, ariaLabel }) => {
  const { setRef, handleClickAway } = useOverlay(isOpen, onClose);

  const newChildren = Children.only(children);

  const childrenChildren = Children.toArray(newChildren.props.children);
  childrenChildren.push(
    <CloseButton
      key="close"
      onClick={onClose}
      ariaLabel={`Close ${ariaLabel}`}
    />
  );

  const childrenWithCloseButton = cloneElement(newChildren, {
    ref: (node: SetStateAction<HTMLDivElement | null>) => setRef(node),
    children: childrenChildren,
  });

  return (
    <>
      {isOpen &&
        createPortal(
          <FocusTrap>
            <aside
              tabIndex={-1}
              role="presentation"
              aria-label={ariaLabel}
              onClick={handleClickAway}
              className="overlay"
            >
              {childrenWithCloseButton}
            </aside>
          </FocusTrap>,
          document.body
        )}
      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          transform: translateZ(0);
          background: rgba(0, 0, 0, 0.25);
        }
      `}</style>
      <style jsx global>{`
        .scroll-lock {
          overflow: none;
        }
      `}</style>
    </>
  );
};

export default Overlay;
