import Message, { MessageType } from '.';

export default {
  title: 'Components/Message',
  component: Message,
};

export const Default = () => (
  <Message>
    <p>Default Message</p>
  </Message>
);

export const WithTitle = () => (
  <Message title="Title">
    <p>Message with Title</p>
  </Message>
);

export const Success = () => (
  <Message type={MessageType.SUCCESS}>
    <p>Success Message</p>
  </Message>
);

export const Warning = () => (
  <Message type={MessageType.WARNING}>
    <p>Warning Message</p>
  </Message>
);

export const Error = () => (
  <Message type={MessageType.ERROR}>
    <p>Error Message</p>
  </Message>
);
