import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema.ts',
  out: process.env.MIGRATE_FILE!,
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
} satisfies Config;
