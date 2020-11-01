import { FC } from 'react';
import Img from 'react-optimized-image';

import CloseIcon from 'icons/close-icon.svg';
import IconButton from '../../Buttons/IconButton';

interface Props {
  onClick: () => void;
  ariaLabel: string;
}

const CloseButton: FC<Props> = ({ onClick, ariaLabel }) => (
  <div>
    <IconButton onClick={onClick} ariaLabel={ariaLabel}>
      <Img src={CloseIcon} inline />
    </IconButton>
    <style jsx>{`
      div {
        position: absolute;
        top: var(--spacing-2);
        right: var(--spacing-2);
      }
    `}</style>
  </div>
);

export default CloseButton;
