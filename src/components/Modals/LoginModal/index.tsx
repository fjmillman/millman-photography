import { unwrapResult } from '@reduxjs/toolkit';
import { useState, FC } from 'react';

import Modal from '../Modal';
import LoginForm from '../../Forms/LoginForm';
import { LoginData } from '../../../store/User/Login/Types';
import { login } from '../../../store/User/Login/Effects';
import { useThunkDispatch } from '../../../store';
import Message, { MessageType } from '../../Message';

const LOGIN_FORM_ID = 'login-form';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: FC<Props> = ({ isOpen, onClose }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useThunkDispatch();

  const handleSubmit = async (loginData: LoginData) => {
    setErrorMessage(null);

    try {
      const result = await dispatch(login(loginData));

      unwrapResult(result);

      onClose();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const formId = LOGIN_FORM_ID;

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Login Modal">
      <Modal.Header>
        <h1>Log in with your email</h1>
      </Modal.Header>
      <Modal.Content>
        <LoginForm
          formId={formId}
          onSubmit={handleSubmit}
          isError={!!errorMessage}
        />
        {errorMessage && (
          <Message type={MessageType.ERROR}>
            <p>{errorMessage}</p>
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
