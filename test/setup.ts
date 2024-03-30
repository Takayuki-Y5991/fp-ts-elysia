import { afterAll, beforeAll } from 'bun:test';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import { niceWorkMessage, startMessage } from './config/figlet';
import { closeDatabase, setupDatabase } from './config/drizzle.plugin';

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
