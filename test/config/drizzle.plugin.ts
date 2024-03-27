import postgres from 'postgres';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../../src/schema';

export const queryClient = postgres('postgresql://test:p@ssw0rd@localhost:5433/test-project-board');
export const client = drizzle(queryClient, { logger: true, schema });

export type PostgresDB = PostgresJsDatabase<typeof schema>;
