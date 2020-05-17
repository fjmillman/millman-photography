export const promiseWrap = <T>(body: T) =>
  new Promise<T>((resolve) => resolve(body));

export const responseWrap = <T>(body: T): Response =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-type': 'application/json',
    },
  });
