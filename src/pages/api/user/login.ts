import { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';

import { serverClient, serializeFaunaCookie } from '../../../utils/fauna-auth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  try {
    const { email, password } = await req.body;

    if (!email || !password) {
      throw new Error('Email and password must be provided.');
    }

    const { secret } = await serverClient.query<{ secret: string }>(
      q.Login(q.Match(q.Index('users_by_email'), email), {
        password,
      })
    );

    if (!secret) {
      throw new Error(
        'Email address was not found, or the password was incorrect.'
      );
    }

    const cookieSerialized = serializeFaunaCookie(secret);

    res.setHeader('Set-Cookie', cookieSerialized);
    res.status(200).end();
  } catch (error) {
    res.status(400).send(error.message);
  }
};
