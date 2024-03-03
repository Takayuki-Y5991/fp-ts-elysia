import { Account, Prisma } from '@prisma/client';

export interface IAccountRepository {
  findByUserName(username: string, tx: Prisma.TransactionClient): Promise<Account[] | []>;
  findByEmail(email: string, tx: Prisma.TransactionClient): Promise<Account | null>;
  create(account: Omit<Account, 'id'>, tx: Prisma.TransactionClient): Promise<Account>;
}

export const AccountRepository: IAccountRepository = {
  findByUserName: async (username: string, tx: Prisma.TransactionClient): Promise<Account[] | []> => {
    return tx.account.findMany({
      where: {
        name: {
          contains: username,
        },
      },
    });
  },
  findByEmail: async (email: string, tx: Prisma.TransactionClient): Promise<Account | null> => {
    return tx.account.findFirst({
      where: {
        email: email,
      },
    });
  },
  create(account: Omit<Account, 'id'>, tx: Prisma.TransactionClient): Promise<Account> {
    return tx.account.create({
      data: account,
    });
  },
};
