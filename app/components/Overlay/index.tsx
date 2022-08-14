import FocusTrap from 'focus-trap-react';
import type { SetStateAction, FunctionComponentElement, FC } from 'react';
import { Children, cloneElement } from 'react';
import { createPortal } from 'react-dom';

import CloseButton from './components/CloseButton';
import useOverlay from './hooks/useOverlay';

type Props = {
  children: FunctionComponentElement<JSX.IntrinsicElements['div']>;
  isOpen: boolean;
  onClose: () => void;
  ariaLabel: string;
};

const Overlay: FC<Props> = ({ children, isOpen, onClose, ariaLabel }) => {
  const { setRef, handleClickAway } = useOverlay(isOpen, onClose);

  const newChildren = Children.only(children);

  const childrenChildren = Children.toArray(newChildren.props.children);
  childrenChildren.push(<CloseButton key="close" onClick={onClose} ariaLabel={`Close ${ariaLabel}`} />);

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
              className="fixed t-0 l-0 w-full h-full z-10 transform-translateZ[0] bg-gray-50"
            >
              {childrenWithCloseButton}
            </aside>
          </FocusTrap>,
          document.body
        )}
    </>
  );
};

export default Overlay;
