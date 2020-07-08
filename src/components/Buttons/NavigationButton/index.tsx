import { FC } from 'react';

interface Props {
  onClick: () => void;
  ariaLabel: string;
}

const NavigationButton: FC<Props> = ({ children, onClick, ariaLabel }) => (
  <button type="button" onClick={onClick} aria-label={ariaLabel}>
    {children}
    <style jsx>{`
      button {
        height: var(--size-12);
        width: var(--size-full);
        padding: var(--spacing-1);
        border-radius: var(--size-1);
        background-color: lightgray;
      }

      button:hover {
        background-color: gray;
      }

      p {
        white-space: nowrap;
      }

      @media screen and (min-width: 640px) {
        button {
          width: var(--size-24);
        }
      }
    `}</style>
  </button>
);

export default NavigationButton;
