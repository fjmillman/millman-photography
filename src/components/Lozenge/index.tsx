import { FC } from 'react';

export enum LozengeType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

const getColour = (type?: LozengeType) => {
  if (type === LozengeType.PRIMARY) {
    return '--colour-primary';
  }

  if (type === LozengeType.SECONDARY) {
    return '--colour-secondary';
  }

  if (type === LozengeType.SUCCESS) {
    return '--colour-green-400';
  }

  if (type === LozengeType.WARNING) {
    return '--colour-orange-400';
  }

  if (type === LozengeType.ERROR) {
    return '--colour-red-400';
  }

  return '--colour-grey-200';
};

interface Props {
  type?: LozengeType;
}

const Lozenge: FC<Props> = ({ children, type }) => (
  <div>
    {children}
    <style jsx>{`
      display: inline-block;
      padding: var(--size-px) var(--size-2);
      border-radius: var(--size-1);
    `}</style>
    <style jsx>{`
      background-color: var(${getColour(type)});
    `}</style>
  </div>
);

export default Lozenge;
