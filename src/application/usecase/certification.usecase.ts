import { account } from './../../schema';
import { Account } from '@/domain/models/account.model';
import { IGoogleClient } from '@/domain/ports/client/google.client.port';
import { IAccountRepository } from '@/domain/ports/repository/account.repository.port';
import { GoogleClientT, PgTransactionT, TokenPayloadT } from '@/types/configTypes';
import { Optional } from '@/types/globalTypes';
import { Effect as E, pipe } from 'effect';

interface Context {
  accountRepo: IAccountRepository;
  googleClient: IGoogleClient;
  oauth2: GoogleClientT;
  tx: PgTransactionT;
}

const verifyToken = (token: string, client: IGoogleClient, oauth2: GoogleClientT): E.Effect<TokenPayloadT, Error, never> =>
  client.verifyToken(token, oauth2);
const findByExternalId = (payload: string, accountRepo: IAccountRepository, tx: PgTransactionT): E.Effect<Optional<Account>, Error, never> =>
  E.tryPromise({
    try: () => accountRepo.findExternalId(payload, tx),
    catch: (error: any) => error,
  });

export const Certification = (token: string, { accountRepo, googleClient, oauth2, tx }: Context) =>
  E.runPromise(
    pipe(
      verifyToken(token, googleClient, oauth2),
      E.flatMap((payload: TokenPayloadT) => {
        if (payload && payload.sub) return findByExternalId(payload.sub, accountRepo, tx);
        return E.fail(new Error('invalid payload'));
      }),
      E.matchEffect({
        onSuccess: (account: Optional<Account>) => E.succeed(account),
        onFailure: (error) => E.fail(error),
      }),
    ),
  );
