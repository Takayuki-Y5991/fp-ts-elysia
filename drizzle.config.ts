import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema.ts',
  out: process.env.MIGRATE_FILE!,
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
