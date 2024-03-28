import { afterAll, beforeAll } from 'bun:test';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import { client } from './config/drizzle.plugin';
import { niceWorkMessage, startMessage } from './config/figlet';

beforeAll(async () => {
  startMessage();
  await migrate(client, { migrationsFolder: path.resolve(__dirname, '../drizzle/migrations') }).catch((e) => {
    console.error('Test Migrate failure! :', e);
    process.exit(1);
  });
});
afterAll(async () => {
  niceWorkMessage();
});
