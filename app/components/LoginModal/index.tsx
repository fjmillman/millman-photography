import * as Dialog from '@radix-ui/react-dialog';
import { useActionData, useTransition } from '@remix-run/react';
import type { FC } from 'react';

import Message, { MessageType } from '~/components/Message';

import LoginForm from '../Forms/LoginForm';

const LOGIN_FORM_ID = 'login-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal: FC<Props> = ({ isOpen, onClose }: Props) => {
  const formId = LOGIN_FORM_ID;

  const actionData = useActionData();
  const { state } = useTransition();

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>
            <h1 className="text-sm font-bold">Log in with your email</h1>
          </Dialog.Title>
          <LoginForm formId={formId} />
          {actionData?.error ? <Message type={MessageType.ERROR}>{actionData.error}</Message> : null}
          <input
            className="h-12 w-full rounded-sm cursor-pointer text-sm font-bold hover:bg-gray-400"
            type="submit"
            value={state === 'submitting' ? 'Logging in' : 'Log in'}
            form={formId}
          />
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LoginModal;
