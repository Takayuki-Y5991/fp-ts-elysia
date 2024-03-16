import { timestamp, pgTable, uuid, varchar, pgEnum } from 'drizzle-orm/pg-core';

export const role = pgEnum('role', ['admin', 'customer']);

export const account = pgTable('account', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),
  role: role('role').notNull().default('customer'),
  createdAt: timestamp('created_at').notNull().default(new Date()),
  updatedAt: timestamp('updated_at').notNull().default(new Date()),
});

export type Account = typeof account.$inferSelect;
export type IAccount = typeof account.$inferInsert;
