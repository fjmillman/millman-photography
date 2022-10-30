import { Link } from '@remix-run/react';
import type { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  to: string;
}>;

const NavigationLink: FC<Props> = ({ children, to }) => (
  <Link
    to={to}
    className="py-2 px-4 cursor-pointer shadow-md rounded-md bg-white w-full text-black mb-4 whitespace-nowrap hover:bg-gray-200 sm:inline-block sm:w-[unset] sm:ml-4 sm:mb-[unset]"
  >
    {children}
  </Link>
);

export default NavigationLink;
