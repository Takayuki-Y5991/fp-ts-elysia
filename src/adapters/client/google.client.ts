import { IGoogleClient } from '@/core/ports/client/google.client.port';
import { AuthT, LoginTicketT } from '@/types/config.type';
import { Effect as E } from 'effect';

export const GoogleClient = (auth: AuthT): IGoogleClient => {
  return {
    verifyToken: (token: string): E.Effect<LoginTicketT, Error, never> =>
      E.tryPromise({
        try: () => auth.verifyIdToken(token),
        catch: (error: any) => error,
      }),
  };
};
