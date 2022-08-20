import * as Dialog from '@radix-ui/react-dialog';
import { useActionData, useTransition } from '@remix-run/react';
import type { FC } from 'react';
import { useState } from 'react';

import Message, { MessageType } from '~/components/Message';
import closeIcon from '~/icons/close-icon.svg';

import IconButton from '../Buttons/IconButton';
import NavigationButton from '../Buttons/NavigationButton';
import LoginForm from '../Forms/LoginForm';

const LOGIN_FORM_ID = 'login-form';

const LoginModal: FC = () => {
  const formId = LOGIN_FORM_ID;

  const actionData = useActionData();
  const { state } = useTransition();
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <NavigationButton onClick={() => setOpen(true)} ariaLabel="Open login modal">
          Log in
        </NavigationButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-[450px] mh-[85vh] p-[25px] bg-white -translate-x-1/2 -translate-y-1/2 rounded-md shadow-md">
          <Dialog.Title>
            <h1 className="text-lg font-bold">Log in with your email</h1>
          </Dialog.Title>
          <LoginForm formId={formId} />
          {actionData?.error ? <Message type={MessageType.ERROR}>{actionData.error}</Message> : null}
          <input
            className="h-12 w-full rounded-sm cursor-pointer text-sm font-bold hover:bg-gray-400"
            type="submit"
            value={state === 'submitting' ? 'Logging in' : 'Log in'}
            form={formId}
          />
          <Dialog.Close className="absolute top-2 right-2">
            <IconButton onClick={() => setOpen(false)}>
              <img src={closeIcon} alt="close icon" />
            </IconButton>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LoginModal;
