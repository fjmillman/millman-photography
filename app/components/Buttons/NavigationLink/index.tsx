import type { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router';

type Props = PropsWithChildren<{
  to: string;
}>;

const NavigationLink: FC<Props> = ({ children, to }) => (
  <Link
    to={to}
    className="py-2 px-4 cursor-pointer shadow-md rounded-md bg-white w-full text-black whitespace-nowrap hover:bg-gray-200"
  >
    {children}
  </Link>
);

export default NavigationLink;
