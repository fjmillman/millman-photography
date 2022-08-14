import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    errorFormat: 'minimal',
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      errorFormat: 'pretty',
    });
  }

  prisma = global.prisma;
}

export default prisma;
