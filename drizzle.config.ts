import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema.ts',
  out: Bun.env.MIGRATE_FILE!,
  dialect: 'postgresql',
  dbCredentials: {
    url: Bun.env.DATABASE_URL!,
  },
  strict: true,
} satisfies Config;
