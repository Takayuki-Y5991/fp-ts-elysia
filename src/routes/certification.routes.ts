import { certificationHandler } from '@/adapters/handlers/certification.handler';
import { certificationSetup, globalSetup, isFoundError } from '@/setup';
import { handleEffect } from '@/utils/handler';
import Elysia, { error as ElysiaError } from 'elysia';

export const certificationRoutes = new Elysia({ prefix: '/certification' })
  .use(globalSetup)
  .use(certificationSetup)
  .derive(({ headers }) => {
    const token = headers['authentication']?.split(' ')[1];
    return { token: token ? token : '' };
  })
  // .use(certificationPlugin)
  .get(
    '',
    async ({ client, accountRepo, googleClient, token }) =>
      await client.transaction(async (tx) => {
        const result = certificationHandler(token, { accountRepo, googleClient, tx });
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
