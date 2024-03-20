import { afterAll, beforeAll } from 'bun:test';
import { client } from '../src/plugins/config/drizzie.plugin';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import path from 'path';

beforeAll(async () => {
  console.log(':rocket: FINISH - START');

  await migrate(client, { migrationsFolder: path.resolve(__dirname, '../drizzle/migrations') }).catch((e) => {
    console.error('Test Migrate failure! :', e);
    process.exit(1);
  });
});
afterAll(async () => {
  console.log(':rocket: FINISH - TEST');
});
