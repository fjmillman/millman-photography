import { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';
import cookie from 'cookie';

import { faunaClient, FAUNA_SECRET_COOKIE } from '../../../utils/fauna-auth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const cookies = cookie.parse(req.headers.cookie ?? '');
  const faunaSecret = cookies[FAUNA_SECRET_COOKIE];

  if (!faunaSecret) {
    res.status(200).end();
    return;
  }

  await faunaClient(faunaSecret).query(q.Logout(false));

  const cookieSerialized = cookie.serialize(FAUNA_SECRET_COOKIE, '', {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1,
    httpOnly: true,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookieSerialized);
  res.status(200).end();
};
