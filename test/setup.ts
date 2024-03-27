import { afterAll, beforeAll } from 'bun:test';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import path from 'path';
import { client } from './config/drizzle.plugin';
import { sql } from 'drizzle-orm';

beforeAll(async () => {
  console.log(':rocket: FINISH - START');

  await client.execute(sql`select now()`);
  await migrate(client, { migrationsFolder: path.resolve(__dirname, '../drizzle/migrations') }).catch((e) => {
    console.error('Test Migrate failure! :', e);
    process.exit(1);
  });
});
afterAll(async () => {
  console.log(':rocket: FINISH - TEST');
});
