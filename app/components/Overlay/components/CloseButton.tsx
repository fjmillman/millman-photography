import type { FC } from 'react';

import closeIcon from '~/icons/close-icon.svg';

import IconButton from '../../Buttons/IconButton';

type Props = {
  onClick: () => void;
  ariaLabel: string;
};

const CloseButton: FC<Props> = ({ onClick, ariaLabel }) => (
  <div className="absolute top-2 right-2">
    <IconButton onClick={onClick} ariaLabel={ariaLabel}>
      <img src={closeIcon} alt="close icon" />
    </IconButton>
  </div>
);

export default CloseButton;
