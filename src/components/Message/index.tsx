import { FC } from 'react';

export enum MessageType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

const getColour = (type?: MessageType) => {
  if (type === MessageType.SUCCESS) {
    return '--colour-green-400';
  }

  if (type === MessageType.WARNING) {
    return '--colour-orange-400';
  }

  if (type === MessageType.ERROR) {
    return '--colour-red-400';
  }

  return '--colour-grey-400';
};

interface Props {
  type?: MessageType;
  title?: string;
}

const Message: FC<Props> = ({ children, type, title }) => (
  <div className="message">
    {title && <h1>{title}</h1>}
    {children}
    <style jsx>{`
      .message {
        background: white;
        border-left: solid var(--size-2);
        border-radius: var(--size-1);
        box-shadow: var(--size-1) var(--size-1) var(--size-1) rgba(0, 0, 0, 0.2);
        padding: var(--size-4);
      }

      h1 {
        font-weight: bold;
        margin-bottom: var(--spacing-2);
      }
    `}</style>
    <style jsx>{`
      .message {
        border-left-color: var(${getColour(type)});
      }
    `}</style>
  </div>
);

export default Message;
