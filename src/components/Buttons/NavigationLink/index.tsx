import { FC } from 'react';
import Link from 'next/link';

import LinkButton from '../LinkButton';

interface Props {
  href: string;
}

const NavigationLink: FC<Props> = ({ children, href }) => (
  <Link href={href}>
    <LinkButton>{children}</LinkButton>
  </Link>
);

export default NavigationLink;
