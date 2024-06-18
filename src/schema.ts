import { pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const role = pgEnum('role', ['admin', 'customer']);
export const provider = pgEnum('provider', ['email', 'github', 'google']);

export const account = pgTable('account', {
  id: uuid('id').primaryKey().defaultRandom(),
  externalId: varchar('externalId').notNull(),
  provider: provider('provider').notNull(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  role: role('role').notNull().default('customer'),
});

export type SAccount = typeof account.$inferSelect;
export type IAccount = typeof account.$inferInsert;
