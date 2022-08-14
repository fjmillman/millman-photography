import type { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  onClick: () => void;
  ariaLabel: string;
  disabled?: boolean;
}>;

const NavigationButton: FC<Props> = ({ children, onClick, ariaLabel, disabled = false }) => (
  <button
    className="h-12 w-full p-1 rounded-sm bg-gray-50 hover:bg-gray sm:w-24"
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    disabled={disabled}
  >
    {children}
  </button>
);

export default NavigationButton;
