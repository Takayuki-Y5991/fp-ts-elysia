import { ExtractTablesWithRelations } from 'drizzle-orm';
import { PgTransaction } from 'drizzle-orm/pg-core';
import * as schema from '@/schema';
import { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';

export type PgTransactionT = PgTransaction<NodePgQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>;

export type GoogleClientT = OAuth2Client;
export type LoginTicketT = LoginTicket;
export type TokenPayloadT = TokenPayload | undefined;
