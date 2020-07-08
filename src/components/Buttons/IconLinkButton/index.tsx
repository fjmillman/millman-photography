import { forwardRef, ComponentProps } from 'react';

const IconLinkButton = forwardRef<HTMLAnchorElement, ComponentProps<'a'>>(
  ({ children, onClick, href }, ref) => (
    <a href={href} onClick={onClick} ref={ref}>
      {children}
      <style jsx>{`
        a {
          height: var(--size-8);
          width: var(--size-8);
          padding: var(--size-1);
          cursor: pointer;
          box-shadow: 0 0 var(--size-2) rgba(0, 0, 0, 0.2);
          border-radius: var(--size-1);
          color: var(--size-black);
          background-color: var(--colour-white);
        }

        a:hover {
          background-color: var(--colour-grey-200);
        }
      `}</style>
    </a>
  )
);

export default IconLinkButton;
