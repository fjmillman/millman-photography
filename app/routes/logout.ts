import type { ActionFunction } from '@remix-run/node';

import { logout } from '~/utils/auth.server';

export const action: ActionFunction = ({ request }) => logout(request);
