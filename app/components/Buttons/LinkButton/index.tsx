import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

const LinkButton = forwardRef<HTMLAnchorElement, ComponentProps<'a'>>(({ children, onClick, href }, ref) => (
  <a
    className="py-2 px-4 cursor-pointer shadow-md rounded-md bg-white w-full text-black mb-4 whitespace-nowrap hover:bg-gray-200 sm:inline-block sm:w-[unset] sm:ml-4 sm:mb-[unset]"
    href={href}
    onClick={onClick}
    ref={ref}
  >
    {children}
  </a>
));

LinkButton.displayName = 'LinkButton';

export default LinkButton;
