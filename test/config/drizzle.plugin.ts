import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../../src/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
export const pool = new Pool({ connectionString: 'postgresql://test:p@ssw0rd@localhost:5433/test-project-board' });
export const client = drizzle(pool, { logger: false, schema });

export type PostgresDB = NodePgDatabase<typeof schema>;
