import { data, redirect } from 'react-router';

import type { LoginFormData } from '~/utils/auth.server';
import { login } from '~/utils/auth.server';

import type { Route } from './+types/login';

export interface ErrorResponseData {
  error: string;
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return data<ErrorResponseData>({ error: `Invalid Form Data` }, { status: 400 });
  }

  const loginFormData: LoginFormData = { email, password };

  return await login(loginFormData);
};

export const loader = () => redirect('/');
