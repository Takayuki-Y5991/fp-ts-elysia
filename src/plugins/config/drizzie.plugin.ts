import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../../schema';

export const queryClient = postgres(Bun.env.DATABASE_URL!);
export const client = drizzle(queryClient, { logger: true, schema });
