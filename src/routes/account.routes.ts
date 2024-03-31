import { Elysia, error as ElysiaError } from 'elysia';
import { accountSetUp, globalSetup, isFoundError } from '../setup';
import { handleTE } from '../utils/handler';

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
  )
  .onError(({ code, error }) => {
    if (code === 'VALIDATION') return ElysiaError('Bad Request', { message: error.message });
    return isFoundError(error) ? { message: error.value.response } : { message: error.message };
  });
