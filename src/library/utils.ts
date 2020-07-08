export const promiseWrap = <T>(body: T) =>
  new Promise<T>((resolve) => resolve(body));

export const responseWrap = <T = undefined>(body?: T): Response =>
  new Response(body ? JSON.stringify(body) : undefined, {
    status: 200,
  });

export const errorResponseWrap = (message: string): Response =>
  new Response(message, {
    status: 400,
  });
