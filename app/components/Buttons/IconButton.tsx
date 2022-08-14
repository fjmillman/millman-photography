import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import Button from './Button';

type Props = PropsWithChildren<{
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}>;

const IconButton: FC<Props> = ({ children, onClick, className, ariaLabel }) => (
  <Button onClick={onClick} className={classNames('w-12 p-1', { className })} aria-label={ariaLabel}>
    {children}
  </Button>
);

export default IconButton;
