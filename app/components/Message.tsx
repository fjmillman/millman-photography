import type { FC, PropsWithChildren } from 'react';

export enum MessageType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

const getColour = (type?: MessageType) => {
  if (type === MessageType.SUCCESS) {
    return 'green-400';
  }

  if (type === MessageType.WARNING) {
    return 'orange-400';
  }

  if (type === MessageType.ERROR) {
    return 'red-400';
  }

  return 'gray-400';
};

type Props = PropsWithChildren<{
  type?: MessageType;
  title?: string;
}>;

const Message: FC<Props> = ({ children, type, title }) => (
  <div className={`bg-white border-l-2 rounded-md shadow-md p-4 border-l-${getColour(type)}`}>
    {title && <h1 className="font-bold mb-2">{title}</h1>}
    {children}
  </div>
);

export default Message;
