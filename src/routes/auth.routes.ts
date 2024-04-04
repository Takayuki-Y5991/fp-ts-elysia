import { Elysia, error as ElysiaError } from 'elysia';
import { globalSetup, isFoundError } from '../setup';

export const accountRoutes = new Elysia({ prefix: '/auth' })
  .use(globalSetup)
  .post(
    '/login',
    async ({ headers }) =>
      await client.transaction(async (tx) => {
        return await accountService.create(body, accountRepository, tx).then(handleTE);
      }),
    {},
  )
  .onError(({ code, error }) => {
    if (code === 'VALIDATION') return ElysiaError('Bad Request', { message: error.message });
    return isFoundError(error) ? { message: error.value.response } : { message: error.message };
  });
