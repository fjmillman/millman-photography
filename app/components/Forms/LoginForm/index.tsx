import { useFetcher } from 'react-router';

export const LOGIN_FORM_ID = 'login-form';

const LoginForm = () => {
  const formId = LOGIN_FORM_ID;
  const fetcher = useFetcher({ key: formId });
  const busy = fetcher.state !== 'idle';

  return (
    <fetcher.Form id={formId} method="post" action="/login">
      <fieldset disabled={busy}>
        <label className="mb-24">
          <p className="w-full mb-2">Email</p>
          <input
            className="h-12 w-full border-2 rounded-sm p-2 mb-4"
            name="email"
            placeholder="Email"
            type="email"
            autoComplete="email"
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
            autoComplete="none"
            required
          />
        </label>
      </fieldset>
    </fetcher.Form>
  );
};

export default LoginForm;
