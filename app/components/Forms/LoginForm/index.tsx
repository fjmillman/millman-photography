import { Form, useTransition } from '@remix-run/react';
import type { FC } from 'react';

type Props = {
  formId: string;
};

const LoginForm: FC<Props> = ({ formId }) => {
  const { state } = useTransition();

  return (
    <Form id={formId} method="post" action="/login">
      <fieldset disabled={state === 'submitting'}>
        <label className="mb-24">
          <p className="w-full mb-2">Email</p>
          <input
            className="h-12 w-full border-2 rounded-sm p-2 mb-4"
            name="email"
            placeholder="Email"
            type="email"
            autoComplete="yes"
            required
          />
        </label>
        <label>
          <p className="w-full mb-2">Password</p>
          <input
            className="h-12 w-full border-2 rounded-sm p-2 mb-4"
            name="password"
            placeholder="Password"
            type="password"
            autoComplete="yes"
            required
          />
        </label>
      </fieldset>
    </Form>
  );
};

export default LoginForm;
