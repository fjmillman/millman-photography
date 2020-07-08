/* eslint-disable react/jsx-props-no-spreading */
import { ButtonHTMLAttributes, FC } from 'react';

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

const getColour = (type?: ButtonType) => {
  if (type === ButtonType.PRIMARY) {
    return '--colour-primary';
  }

  if (type === ButtonType.SECONDARY) {
    return '--colour-secondary';
  }

  if (type === ButtonType.SUCCESS) {
    return '--colour-green-400';
  }

  if (type === ButtonType.WARNING) {
    return '--colour-orange-400';
  }

  if (type === ButtonType.ERROR) {
    return '--colour-red-400';
  }

  return '--colour-grey-400';
};

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: ButtonType;
}

const Button: FC<Props> = ({ children, type, ...props }) => {
  const colour = getColour(type);

  return (
    <button type="button" {...props}>
      {children}
      <style jsx>{`
        button {
          height: var(--size-12);
          padding: var(--size-2) var(--size-4);
          border-radius: var(--size-1);
          border-style: solid;
          border-width: var(--size-px);
          cursor: pointer;
        }
      `}</style>
      <style jsx>{`
        button {
          border-color: var(${colour});
        }

        button:hover {
          background-color: var(${colour});
        }
      `}</style>
    </button>
  );
};

export default Button;
