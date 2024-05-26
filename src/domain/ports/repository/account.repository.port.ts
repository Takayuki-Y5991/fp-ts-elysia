import { Account } from '@/domain/models/account.model';
import { SAccount } from '@/schema';
import { PgTransactionT } from '@/types/configTypes';
import { Optional } from '@/types/globalTypes';

const rowToMap = (account: Optional<SAccount>): Optional<Account> => {
  if (!account) return account;
  return {
    ...account,
  };
};

export interface IAccountRepository {
  findExternalId(externalId: string, tx: PgTransactionT): Promise<Optional<Account>>;
}
