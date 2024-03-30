import { CreateAccount } from '../../../src/plugins/account/account.model';
import { IAccount, IAccountRepository } from '../../../src/plugins/account/account.repository';
import { PgTransactionT } from '../../../src/types/configTypes';
import { buildCreatedMockAccount } from './mock';
import { account } from '../../../src/schema';

export const MAccountRepositoryBase: IAccountRepository = {
  findByEmail: async (email: string, tx: PgTransactionT): Promise<IAccount> => buildCreatedMockAccount({}),
  findById: async (id: string, tx: PgTransactionT): Promise<IAccount> => buildCreatedMockAccount({}),
  findByRole: async (role: 'admin' | 'customer', tx: PgTransactionT): Promise<IAccount[]> => [buildCreatedMockAccount({})],
  create: async (entity: CreateAccount, tx: PgTransactionT): Promise<IAccount> => buildCreatedMockAccount({}),
};

export const MAccountRepositoryCreateSuccess = ({
  successAccount = buildCreatedMockAccount({}),
}: {
  successAccount?: IAccount;
}): IAccountRepository => ({
  findByEmail: async (email: string, tx: PgTransactionT): Promise<IAccount> => undefined as unknown as IAccount,
  findById: async (id: string, tx: PgTransactionT): Promise<IAccount> => undefined as unknown as IAccount,
  findByRole: async (role: 'admin' | 'customer', tx: PgTransactionT): Promise<IAccount[]> => [],
  create: async (entity: CreateAccount, tx: PgTransactionT): Promise<IAccount> => successAccount,
});

export const MAccountRepositoryCreateFailureByEmailCheck = ({
  account = buildCreatedMockAccount({}),
}: {
  account?: IAccount;
}): IAccountRepository => ({
  findByEmail: async (email: string, tx: PgTransactionT): Promise<IAccount> => account,
  findById: async (id: string, tx: PgTransactionT): Promise<IAccount> => undefined as unknown as IAccount,
  findByRole: async (role: 'admin' | 'customer', tx: PgTransactionT): Promise<IAccount[]> => [],
  create: async (entity: CreateAccount, tx: PgTransactionT): Promise<IAccount> => undefined as unknown as IAccount,
});

export const MAccountRepositoryCreateFailureByCantParsePassword: IAccountRepository = {
  findByEmail: async (email: string, tx: PgTransactionT): Promise<IAccount> => undefined as unknown as IAccount,
  findById: async (id: string, tx: PgTransactionT): Promise<IAccount> => undefined as unknown as IAccount,
  findByRole: async (role: 'admin' | 'customer', tx: PgTransactionT): Promise<IAccount[]> => [],
  create: async (entity: CreateAccount, tx: PgTransactionT): Promise<IAccount> => undefined as unknown as IAccount,
};

export const MAccountRepositoryCreateFailureByDatabase: IAccountRepository = {
  findByEmail: async (email: string, tx: PgTransactionT): Promise<IAccount> => undefined as unknown as IAccount,
  findById: async (id: string, tx: PgTransactionT): Promise<IAccount> => undefined as unknown as IAccount,
  findByRole: async (role: 'admin' | 'customer', tx: PgTransactionT): Promise<IAccount[]> => [],
  create: async (entity: CreateAccount, tx: PgTransactionT): Promise<IAccount> => {
    throw new Error();
  },
};
