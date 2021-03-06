import { Client } from 'faunadb';
import { serialize } from 'cookie';

export const FAUNA_SECRET_COOKIE = 'faunadbSecret';

export const serverClient =
  process.env.NODE_ENV === 'development'
    ? new Client({
        domain: process.env.FAUNADB_DOMAIN,
        port: process.env.FAUNADB_PORT
          ? parseInt(process.env.FAUNADB_PORT, 10)
          : undefined,
        scheme: process.env.FAUNADB_SCHEME as 'http' | 'https' | undefined,
        secret: process.env.FAUNADB_SECRET ?? '',
      })
    : new Client({
        secret: process.env.FAUNADB_SECRET ?? '',
      });

export const faunaClient = (secret: string) =>
  process.env.NODE_ENV === 'development'
    ? new Client({
        domain: process.env.FAUNADB_DOMAIN,
        port: process.env.FAUNADB_PORT
          ? parseInt(process.env.FAUNADB_PORT, 10)
          : undefined,
        scheme: process.env.FAUNADB_SCHEME as 'http' | 'https' | undefined,
        secret,
      })
    : new Client({
        secret,
      });

export const serializeFaunaCookie = (userSecret: string) =>
  serialize(FAUNA_SECRET_COOKIE, userSecret, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 72576000,
    httpOnly: true,
    path: '/',
  });
