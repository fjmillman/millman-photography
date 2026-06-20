import path from 'node:path'
import { defineConfig } from 'prisma/config'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

import 'dotenv/config'

export default defineConfig({
  experimental: {
    adapter: true,
  },
  migrations: {
    seed: 'vite-node prisma/seed.ts',
  },
  schema: path.join('prisma', 'schema.prisma'),
  // eslint-disable-next-line @typescript-eslint/require-await
  async adapter() {
    return new PrismaLibSQL({
      url: process.env.TURSO_DATABASE_URL ?? '',
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  },
})
