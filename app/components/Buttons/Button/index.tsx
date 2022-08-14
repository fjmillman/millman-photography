/* eslint-disable react/jsx-props-no-spreading */
import type { ButtonHTMLAttributes, FC } from 'react';

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

const getColour = (type?: ButtonType) => {
  if (type === ButtonType.PRIMARY) {
    return 'primary';
  }

  if (type === ButtonType.SECONDARY) {
    return 'secondary';
  }

  if (type === ButtonType.SUCCESS) {
    return 'green-400';
  }

  if (type === ButtonType.WARNING) {
    return 'orange-400';
  }

  if (type === ButtonType.ERROR) {
    return 'red-400';
  }

  return 'gray-400';
};

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: ButtonType;
}

const Button: FC<Props> = ({ children, type, ...props }) => {
  const colour = getColour(type);

  return (
    <button
      className={`h-12 px-2 py-4 rounded-sm border-solid border-2 cursor-pointer border-${colour} hover:bg-${colour}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
