import { Account, CreateAccount } from '@/core/models/account.model';
import { IAccountRepository } from '@/core/ports/repository/account.repository.port';
import { account } from '@/schema';
import { PgTransactionT } from '@/types/config.type';
import { Optional } from '@/types/utility.types';
import { head } from '@/utils/function';
import { eq } from 'drizzle-orm/sql';

export const AccountRepository: IAccountRepository = {
  findById: async (id: string, tx: PgTransactionT): Promise<Optional<Account>> => tx.select().from(account).where(eq(account.id, id)).then(head),
  findByExternalId: async (externalId: string, tx: PgTransactionT): Promise<Optional<Account>> =>
    tx.select().from(account).where(eq(account.externalId, externalId)).then(head),
  create: async (_account: CreateAccount, tx: PgTransactionT): Promise<Account> => tx.insert(account).values(_account).returning().then(head),
};
