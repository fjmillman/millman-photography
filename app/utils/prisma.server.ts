import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client/edge';

const createPrismaClient = (errorFormat: 'minimal' | 'pretty') => {
  const libsql = createClient({
    url: process.env.TURSO_DATABASE_URL ?? '',
    authToken: process.env.TURSO_AUTH_TOKEN ?? '',
  });
  const adapter = new PrismaLibSQL(libsql);

  return new PrismaClient({
    adapter,
    errorFormat,
  }).$extends({
    query: {
      $allModels: {
        async $allOperations({ operation, args, query }) {
          const result = await query(args);

          // Synchronize the embedded replica after any write operation
          if (['create', 'update', 'delete'].includes(operation)) {
            await libsql.sync();
          }

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
