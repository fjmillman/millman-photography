export const isServer = typeof window === 'undefined';

export const PRELOADED_STATE = '__PRELOADED_STATE__';

export const useFixtures = process.env.NEXT_PUBLIC_USE_FIXTURES === 'true';
