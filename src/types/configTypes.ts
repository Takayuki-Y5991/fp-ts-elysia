import { ExtractTablesWithRelations } from 'drizzle-orm';
import { PgTransaction } from 'drizzle-orm/pg-core';
import * as schema from '../schema';
import { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';

export type PgTransactionT = PgTransaction<NodePgQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>;
