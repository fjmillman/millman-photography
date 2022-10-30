import * as Dialog from '@radix-ui/react-dialog';
import { useActionData, useTransition } from '@remix-run/react';
import type { FC } from 'react';
import { useState } from 'react';

import Message, { MessageType } from '~/components/Message';
import closeIcon from '~/icons/close-icon.svg';

import LoginForm from '../Forms/LoginForm';

const LOGIN_FORM_ID = 'login-form';

const LoginModal: FC = () => {
  const formId = LOGIN_FORM_ID;

  const actionData = useActionData();
  const { state } = useTransition();
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="h-12 w-full p-1 rounded-sm bg-gray-50 hover:bg-gray sm:w-24"
        onClick={() => setOpen(true)}
        aria-label="Open login modal"
      >
        Log in
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-[450px] mh-[85vh] p-[25px] bg-white -translate-x-1/2 -translate-y-1/2 rounded-md shadow-md">
          <Dialog.Title className="text-lg font-bold">Log in with your email</Dialog.Title>
          <LoginForm formId={formId} />
          {actionData?.error ? <Message type={MessageType.ERROR}>{actionData.error}</Message> : null}
          <input
            className="h-12 w-full rounded-sm cursor-pointer text-sm font-bold hover:bg-gray-400"
            type="submit"
            value={state === 'submitting' ? 'Logging in' : 'Log in'}
            form={formId}
          />
          <Dialog.Close onClick={() => setOpen(false)} className="w-8 p-1 shadow-md absolute top-2 right-2">
            <img src={closeIcon} alt="close icon" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LoginModal;
