import { certificationHandler } from '@/adapters/handlers/certification.handler';
import { Elysia, error as ElysiaError } from 'elysia';
import { accountSetUp, globalSetup, isFoundError } from '../setup';
import { handleEffect } from '../utils/handler';

export const accountRoutes = new Elysia({ prefix: '/accounts' })
  .use(globalSetup)
  .use(accountSetUp)
  .post(
    '',
    async ({ client, accountRepo, googleClient }) =>
      await client.transaction(async (tx) => {
        const result = certificationHandler('', { accountRepo, googleClient, tx });
        return await handleEffect(result);
      }),
    {
      response: {
        200: 'certification.return',
        400: 'error',
        500: 'error',
      },
    },
  )
  .onError(({ code, error }) => {
    if (code === 'VALIDATION') return ElysiaError('Bad Request', { message: error.message });
    return isFoundError(error) ? { message: error.value.response } : { message: error.message };
  });
