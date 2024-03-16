import { afterAll, beforeAll } from 'bun:test';
import { client, queryClient } from '../src/plugins/config/drizzie.plugin';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

beforeAll(async () => {
  console.log(':rocket: FINISH - START');
  await migrate(client, { migrationsFolder: '../drizzle/test/migrations' });
  await queryClient.end();
});
afterAll(async () => {
  console.log(':rocket: FINISH - TEST');
});
