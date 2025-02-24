import { redirect } from 'react-router';

import { logout } from '~/utils/auth.server';

import type { Route } from './+types/logout';

export const action = ({ request }: Route.ActionArgs) => logout(request);

export const loader = () => redirect('/');
