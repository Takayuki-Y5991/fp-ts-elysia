import { Account } from '@/core/models/account.model';
import { IGoogleClient } from '@/core/ports/client/google.client.port';
import { IAccountRepository } from '@/core/ports/repository/account.repository.port';
import { certification } from '@/core/usecase/certification.usecase';
import { PgTransactionT } from '@/types/config.type';
import { Optional } from '@/types/utility.types';
import { converter } from '@/utils/handler';
import { Effect as E, pipe } from 'effect';
import { TCertificationResponse, certificationResponse } from '../models/response/certification.response';

interface Context {
  accountRepo: IAccountRepository;
  googleClient: IGoogleClient;
  tx: PgTransactionT;
}

export const certificationHandler = (token: string, context: Context): E.Effect<TCertificationResponse, Error, never> =>
  pipe(
    certification(token, context),
    E.flatMap((result: Optional<Account>) => {
      return converter<TCertificationResponse>(result, certificationResponse);
    }),
  );
