import { Account } from '@/core/models/account.model';
import { IGoogleClient } from '@/core/ports/client/google.client.port';
import { IAccountRepository } from '@/core/ports/repository/account.repository.port';
import { LoginTicketT, PgTransactionT } from '@/types/config.type';
import { InvalidParameterError } from '@/types/error.type';
import { Optional } from '@/types/utility.types';

import { Effect as E, pipe } from 'effect';

interface Context {
  accountRepo: IAccountRepository;
  googleClient: IGoogleClient;
  tx: PgTransactionT;
}

const verifyToken = (token: string, client: IGoogleClient): E.Effect<LoginTicketT, Error, never> => client.verifyToken(token);

const findByExternalId = (uid: string, accountRepo: IAccountRepository, tx: PgTransactionT): E.Effect<Optional<Account>, Error, never> =>
  E.tryPromise({
    try: () => accountRepo.findByExternalId(uid, tx),
    catch: (error: any) => error,
  });

export const certification = (token: string, { accountRepo, googleClient, tx }: Context): E.Effect<Optional<Account>, Error, never> =>
  pipe(
    verifyToken(token, googleClient),
    E.flatMap((payload: LoginTicketT) => {
      if (payload && payload.uid) return findByExternalId(payload.uid, accountRepo, tx);
      return E.fail(new InvalidParameterError('invalid payload'));
    }),
    E.matchEffect({
      onSuccess: (account: Optional<Account>) => E.succeed(account),
      onFailure: (error) => E.fail(error),
    }),
  );
