import { Elysia, error as ElysiaError } from 'elysia';
import { authSetup, globalSetup, isFoundError } from '../setup';
import { fold } from 'fp-ts/TaskEither';
import { handleTE } from '../utils/handler';
import { TokenPayload } from 'google-auth-library';

export const accountRoutes = new Elysia({ prefix: '/auth' })
  .use(globalSetup)
  .use(authSetup)
  .post(
    '/login',
    async ({ headers, accountService, accountRepository, googleClient, oauthClient, authService, client }) => {
      const token = headers['Authentication'] as string;
      const result = await authService.login(token, googleClient, oauthClient);
      return fold(
        () => () => handleTE(result),
        (tokenPayload: TokenPayload | undefined) => async () =>
          await client.transaction(async (tx) => await accountService.findByAccount(tokenPayload?.sub, accountRepository, tx).then(handleTE)),
      )(result);
    },
    {
      response: {
        400: 'error',
        401: 'error',
        500: 'error',
      },
    },
  )
  .onError(({ code, error }) => {
    if (code === 'VALIDATION') return ElysiaError('Bad Request', { message: error.message });
    return isFoundError(error) ? { message: error.value.response } : { message: error.message };
  });
