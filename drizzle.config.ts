import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema.ts',
  out: Bun.env.MIGRATE_FILE!,
  driver: 'pg',
  dbCredentials: {
    connectionString: Bun.env.DATABASE_URL!,
  },
} satisfies Config;
