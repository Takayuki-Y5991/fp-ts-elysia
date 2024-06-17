import { Account, CreateAccount } from '@/domain/models/account.model';
import { PgTransactionT } from '@/types/config.type';

import { Optional } from '@/types/utility.types';

export interface IAccountRepository {
  findById(id: string, tx: PgTransactionT): Promise<Optional<Account>>;
  findByExternalId(externalId: string, tx: PgTransactionT): Promise<Optional<Account>>;
  create(account: CreateAccount, tx: PgTransactionT): Promise<Account>;
}
