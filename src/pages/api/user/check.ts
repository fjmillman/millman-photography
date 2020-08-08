import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

import { FAUNA_SECRET_COOKIE } from 'utils/fauna-auth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const cookies = cookie.parse(req.headers.cookie ?? '');
  const faunaSecret = cookies[FAUNA_SECRET_COOKIE];

  if (!faunaSecret) {
    res.status(400).end();
    return;
  }

  res.status(200).end();
};
