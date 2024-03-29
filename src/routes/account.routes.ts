import { Elysia, error } from 'elysia';
import { accountSetUp, globalSetup } from '../setup';
import { handleTE } from '../utils/handler';
import { sql } from 'drizzle-orm';

export const accountRoutes = new Elysia({ prefix: '/accounts' })
  .use(globalSetup)
  .use(accountSetUp)
  .post(
    '',
    async ({ client, accountRepository, accountService, body }) =>
      await client.transaction(async (tx) => {
        return await accountService.create(body, accountRepository, tx).then(handleTE);
      }),
    {
      body: 'account.create',
      response: {
        200: 'account.return',
        400: 'error',
        500: 'error',
      },
    },
  );
