import path from 'node:path'
import { defineConfig, env } from "prisma/config";

import "dotenv/config";

export default defineConfig({
  migrations: {
    seed: 'vite-node prisma/seed.ts',
  },
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    url: env("DATABASE_URL"),
  },
})
