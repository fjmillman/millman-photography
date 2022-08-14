import { Link } from '@remix-run/react';
import type { FC, PropsWithChildren } from 'react';

import LinkButton from '../LinkButton';

type Props = PropsWithChildren<{
  to: string;
}>;

const NavigationLink: FC<Props> = ({ children, to }) => (
  <Link to={to}>
    <LinkButton>{children}</LinkButton>
  </Link>
);

export default NavigationLink;
