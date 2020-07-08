import { FormEvent, useState, useEffect, FC } from 'react';

import { LoginData } from '../../../store/User/Login/Types';

interface Props {
  formId?: string;
  onSubmit: (loginData: LoginData) => void;
  isError?: boolean;
}

const LoginForm: FC<Props> = ({ formId, onSubmit, isError }) => {
  const [hasErrors, setHasErrors] = useState(isError);

  useEffect(() => {
    setHasErrors(isError);
  }, [isError]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as EventTarget & HTMLFormElement;

    if (!form.checkValidity()) {
      setHasErrors(true);
      return;
    }

    setHasErrors(false);

    const loginData: LoginData = {
      email: '',
      password: '',
    };

    const formElements = form.elements;

    for (let i = 0; i < formElements.length; i += 1) {
      const element = formElements[i] as HTMLFormElement;

      if (element.tagName !== 'BUTTON') {
        loginData[element.name as keyof LoginData] = element.value;
      }
    }

    onSubmit(loginData as LoginData);
  };

  return (
    <form id={formId} onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">
        <p>Email</p>
        <input
          name="email"
          placeholder="Email"
          type="email"
          autoComplete="yes"
          required
        />
      </label>
      <label htmlFor="password">
        <p>Password</p>
        <input
          name="password"
          placeholder="Password"
          type="password"
          autoComplete="yes"
          required
        />
      </label>
      <style jsx>{`
        label {
          margin-bottom: var(--spacing-24);
        }

        p {
          width: var(--size-full);
          margin-bottom: var(--spacing-2);
        }

        input {
          height: var(--size-12);
          width: var(--size-full);
          border: solid black var(--size-px);
          border-radius: var(--size-1);
          padding: var(--spacing-2);
          margin-bottom: var(--spacing-4);
        }
      `}</style>
      <style jsx>{`
        input:invalid {
          border-color: ${hasErrors ? 'red' : 'inherit'};
        }
      `}</style>
    </form>
  );
};

export default LoginForm;
