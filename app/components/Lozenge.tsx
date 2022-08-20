import type { FC, PropsWithChildren } from 'react';

export enum LozengeType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

const getColour = (type?: LozengeType) => {
  if (type === LozengeType.PRIMARY) {
    return 'primary';
  }

  if (type === LozengeType.SECONDARY) {
    return 'secondary';
  }

  if (type === LozengeType.SUCCESS) {
    return 'green-400';
  }

  if (type === LozengeType.WARNING) {
    return 'orange-400';
  }

  if (type === LozengeType.ERROR) {
    return 'red-400';
  }

  return 'gray-200';
};

type Props = PropsWithChildren<{
  type?: LozengeType;
}>;

const Lozenge: FC<Props> = ({ children, type }) => (
  <div className={`inline-block py-1 px-2 rounded-md bg-${getColour(type)}`}>{children}</div>
);

export default Lozenge;
