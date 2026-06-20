import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client-generated';
// eslint-disable-next-line import-x/no-nodejs-modules
import { inspect } from 'node:util';

const createPrismaClient = (errorFormat: 'minimal' | 'pretty') => {
  const adapter = new PrismaLibSQL({
    url: process.env.TURSO_DATABASE_URL ?? '',
    authToken: process.env.TURSO_AUTH_TOKEN ?? '',
  });

  return new PrismaClient({
    adapter,
    errorFormat,
  }).$extends({
    query: {
      $allModels: {
        async $allOperations({ operation, model, args, query }) {
          const start = performance.now();
          const result = await query(args);
          const end = performance.now();
          const time = end - start;
          console.log(inspect({ model, operation, time, args }, { showHidden: false, depth: null, colors: true }));
          return result;
        },
      },
    },
  });
};

type GlobalThis = typeof globalThis &
  Window & {
    prisma: ReturnType<typeof createPrismaClient> | undefined;
  };

let prisma: ReturnType<typeof createPrismaClient>;

if (process.env.NODE_ENV === 'production') {
  prisma = createPrismaClient('minimal');
} else {
  const globalThis = global as GlobalThis;

  if (!globalThis.prisma) {
    globalThis.prisma = createPrismaClient('pretty');
  }

  prisma = globalThis.prisma;
}

export default prisma;
