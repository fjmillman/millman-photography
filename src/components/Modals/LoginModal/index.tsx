import { unwrapResult } from '@reduxjs/toolkit';
import { FC } from 'react';

import Modal from '../Modal';
import LoginForm from '../../Forms/LoginForm';
import { LoginData } from '../../../store/User/Login/Types';
import Message, { MessageType } from '../../Message';
import useLogin from './hooks/useLogin';

const LOGIN_FORM_ID = 'login-form';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: FC<Props> = ({ isOpen, onClose }: Props) => {
  const {
    state: { error },
    actions: { handleLogin },
  } = useLogin();

  const handleSubmit = async (loginData: LoginData) => {
    try {
      const result = await handleLogin(loginData);
      unwrapResult(result);
      onClose();
    } catch (err) {
      // no-op
    }
  };

  const formId = LOGIN_FORM_ID;

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Login Modal">
      <Modal.Header>
        <h1>Log in with your email</h1>
      </Modal.Header>
      <Modal.Content>
        <LoginForm formId={formId} onSubmit={handleSubmit} isError={!!error} />
        {error && (
          <Message type={MessageType.ERROR}>
            <p>{error}</p>
          </Message>
        )}
      </Modal.Content>
      <Modal.Footer>
        <input type="submit" value="Log in" form={formId} />
      </Modal.Footer>
      <style jsx>{`
        h1 {
          font-size: var(--size-6);
          font-weight: bold;
        }

        input {
          height: var(--size-12);
          width: var(--size-full);
          border-radius: var(--size-1);
          cursor: pointer;
          font-size: var(--size-4);
          font-weight: bold;
        }

        input:hover {
          background-color: darkgray;
        }
      `}</style>
    </Modal>
  );
};

export default LoginModal;
