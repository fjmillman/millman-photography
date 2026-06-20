import { compareSync } from 'bcryptjs';
import { data, createCookieSessionStorage, redirect } from 'react-router';

import prisma from './prisma.server';

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

interface SessionData {
  userId: number;
}

const storage = createCookieSessionStorage<SessionData>({
  cookie: {
    name: 'millman-photography-session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export const createUserSession = async (userId: number, redirectTo: string) => {
  const session = await storage.getSession();

  session.set('userId', userId);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
};

export interface LoginFormData {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginFormData) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !compareSync(password, user.password)) {
    return data({ error: `Incorrect login` }, { status: 400 });
  }

  return createUserSession(user.id, '/');
};

export async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'number') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    return redirect(`/login?${searchParams}`);
  }
  return userId;
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'number') return null;
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== 'number') {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch {
    return logout(request);
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}
