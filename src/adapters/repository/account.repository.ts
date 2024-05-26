import { Account } from '@/domain/models/account.model';
import { IAccountRepository, rowToMap } from '@/domain/ports/repository/account.repository.port';

import { SAccount, account } from '@/schema';
import { PgTransactionT } from '@/types/configTypes';
import { Optional } from '@/types/globalTypes';
import { head, mapForRow } from '@/utils/function';
import { eq } from 'drizzle-orm/sql';

export const AccountRepository: IAccountRepository = {
  findExternalId: async (externalId: string, tx: PgTransactionT): Promise<Optional<Account>> =>
    tx
      .select()
      .from(account)
      .where(eq(account.externalId, externalId))
      .then((rows: SAccount[]) => mapForRow(head(rows), rowToMap)),
};
