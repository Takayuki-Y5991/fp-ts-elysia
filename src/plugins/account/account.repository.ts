import { PgTransactionT } from '../../types/configTypes';
import { account } from '../../schema';
import { eq } from 'drizzle-orm';
import { head } from '../../utils/function';
import { CreateAccount } from './account.model';

interface IAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  createdAt: Date;
  updatedAt: Date;
}
interface ICreateAccount {
  role?: 'admin' | 'customer' | undefined;
  name: string;
  email: string;
  password: string;
}

export interface IAccountRepository {
  findByEmail(email: string, tx: PgTransactionT): Promise<IAccount>;
  findById(id: string, tx: PgTransactionT): Promise<IAccount>;
  findByRole(role: 'admin' | 'customer', tx: PgTransactionT): Promise<IAccount[]>;
  create(account: ICreateAccount, tx: PgTransactionT): Promise<IAccount>;
}

export const AccountRepository: IAccountRepository = {
  findByEmail: async (email: string, tx: PgTransactionT): Promise<IAccount> => tx.select().from(account).where(eq(account.email, email)).then(head),
  findById: async (id: string, tx: PgTransactionT): Promise<IAccount> => tx.select().from(account).where(eq(account.id, id)).then(head),
  findByRole: async (role: 'admin' | 'customer', tx: PgTransactionT): Promise<IAccount[]> => tx.select().from(account).where(eq(account.role, role)),
  create: async (entity: CreateAccount, tx: PgTransactionT): Promise<IAccount> => tx.insert(account).values(entity).returning().then(head),
};
