import { forwardRef, ComponentProps } from 'react';

const LinkButton = forwardRef<HTMLAnchorElement, ComponentProps<'a'>>(
  ({ children, onClick, href }, ref) => (
    <a href={href} onClick={onClick} ref={ref}>
      {children}
      <style jsx>{`
        a {
          padding: var(--size-2) var(--size-4);
          cursor: pointer;
          box-shadow: 0 0 var(--size-2) rgba(0, 0, 0, 0.2);
          border-radius: var(--size-1);
          background-color: var(--colour-white);
          width: var(--size-full);
          color: var(--size-black);
          margin-bottom: var(--size-4);
          white-space: nowrap;
        }

        a:hover {
          background-color: var(--colour-grey-200);
        }

        @media screen and (min-width: 640px) {
          a {
            display: inline-block;
            width: unset;
            margin-left: var(--spacing-4);
            margin-bottom: unset;
          }
        }
      `}</style>
    </a>
  )
);

export default LinkButton;
