import { FC } from 'react';
import Image from 'react-optimized-image';

import IconButton from '../../Buttons/IconButton';
import CloseIcon from '../../../icons/close-icon.svg';

interface Props {
  onClick: () => void;
  ariaLabel: string;
}

const CloseButton: FC<Props> = ({ onClick, ariaLabel }) => (
  <div>
    <IconButton onClick={onClick} ariaLabel={ariaLabel}>
      <Image src={CloseIcon} />
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
