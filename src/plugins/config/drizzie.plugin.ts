import postgres from 'postgres';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../../schema';
import { Pool } from 'pg';

export const pool = new Pool({ connectionString: Bun.env.DATABASE_URL! });
export const client = drizzle(pool, { logger: true, schema });

export type PostgresDB = NodePgDatabase<typeof schema>;
