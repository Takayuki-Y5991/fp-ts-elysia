import { Elysia } from 'elysia';
import { accountSetUp, globalSetup } from '../setup';
import { handleTE } from '../utils/handler';

export const accountRoutes = new Elysia({ prefix: '/accounts' })
  .use(globalSetup)
  .use(accountSetUp)
  .post(
    '',
    async ({ prisma, accountRepository, accountService, body }) => {
      return await accountService
        .create(body, accountRepository, prisma)
        .then(handleTE)
        .catch((error) => error);
    },
    {
      body: 'createAccount',
      response: {
        200: 'returnAccount',
        400: 'error',
        500: 'error',
      },
    },
  );
