import { ExtractTablesWithRelations } from 'drizzle-orm';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';
import * as schema from '../schema';

// export type PgTransactionT = PgTransaction<
//   PostgresJsQueryResultHKT,
//   Record<string, never>,
//   ExtractTablesWithRelations<Record<string, never>>
// >;
export type PgTransactionT = PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>;
