import { FC } from 'react';
import classnames from 'classnames';
import css from 'styled-jsx/css';

import Button from '../Button';

interface Props {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

const iconButtonCSS = css.resolve`
  button {
    width: var(--size-12);
    padding: var(--spacing-1) !important;
  }
`;

const IconButton: FC<Props> = ({ children, onClick, className, ariaLabel }) => (
  <Button
    onClick={onClick}
    className={classnames(iconButtonCSS.className, { className })}
    aria-label={ariaLabel}
  >
    {children}
    {iconButtonCSS.styles}
  </Button>
);

export default IconButton;
