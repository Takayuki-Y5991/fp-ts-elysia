import { IGoogleClient } from '@/domain/ports/client/google.client.port';
import { GoogleClientT, LoginTicketT, TokenPayloadT } from '@/types/configTypes';
import { Effect as E } from 'effect';

export const GoogleClient: IGoogleClient = {
  verifyToken: (token: string, client: GoogleClientT): E.Effect<TokenPayloadT, Error, never> =>
    E.tryPromise({
      try: () =>
        client
          .verifyIdToken({
            idToken: token,
          })
          .then((ticket: LoginTicketT) => ticket.getPayload()),
      catch: (error: any) => error,
    }),
};
