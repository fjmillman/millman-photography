import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';

import type { LoginFormData } from '~/utils/auth.server';
import { login } from '~/utils/auth.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }

  const loginFormData: LoginFormData = { email, password };

  return await login(loginFormData);
};

export const loader: LoaderFunction = async () => redirect('/');
