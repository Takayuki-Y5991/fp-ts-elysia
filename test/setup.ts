import { afterAll, beforeAll } from 'bun:test';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import { niceWorkMessage, startMessage } from './config/figlet';
import { closeDatabase, globalSetup, setupDatabase } from './config/drizzle.plugin';
import Elysia from 'elysia';
import { app } from '../src';
import { treaty } from '@elysiajs/eden';

beforeAll(async () => {
  startMessage();
  const client = await setupDatabase();
  await migrate(client, { migrationsFolder: path.resolve(__dirname, '../drizzle/migrations') }).catch((e) => {
    console.error('Test Migrate failure! :', e);
    process.exit(1);
  });
});
afterAll(async () => {
  await closeDatabase();
  niceWorkMessage();
});

export const e2eClient = async () => {
  const client = await setupDatabase();
  return new Elysia().use(app).use(globalSetup(client));
};
