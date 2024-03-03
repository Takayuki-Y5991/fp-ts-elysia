import { IAccountRepository } from './account.repository';
import { Prisma } from '@prisma/client';
import { pipe } from 'fp-ts/function';
import { TaskEither, tryCatch, chain, right as rightTE, left as leftTE, fromEither } from 'fp-ts/TaskEither';
import { hashPassword, verifyPassword } from '../../utils/password';
import { LogicalError, withLoggingAndCatch } from '../../utils/validate';

interface Account {
  id: string;
  name: string;
  email: string;
  password: string;
}

const findByEmailTE = (
  email: string,
  repository: IAccountRepository,
  tx: Prisma.TransactionClient,
): TaskEither<LogicalError, Account | null> =>
  withLoggingAndCatch(() => repository.findByEmail(email, tx), 'Email already exists in the database.');

const createAccountTE = (
  account: Omit<Account, 'id'> & { password: string },
  repository: IAccountRepository,
  tx: Prisma.TransactionClient,
): TaskEither<LogicalError, Account> =>
  withLoggingAndCatch(() => repository.create(account, tx), 'Failed to create account.');

const hashPasswordTE = (password: string): TaskEither<LogicalError, string> =>
  withLoggingAndCatch(() => hashPassword(password), 'Password hashing failed.');

const verifyPasswordTE = (password: string, user: Account): TaskEither<LogicalError, Account> => {
  withLoggingAndCatch(async () => {
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');
    return user;
  }, 'Password verification failed');
};

export interface IAccountService {
  create(
    params: Omit<Account, 'id'>,
    repository: IAccountRepository,
    tx: Prisma.TransactionClient,
  ): Promise<TaskEither<LogicalError, Account>>;
  login(
    params: { email: string; password: string },
    repository: IAccountRepository,
    tx: Prisma.TransactionClient,
  ): Promise<TaskEither<LogicalError, Account>>;
}

export const AccountService: IAccountService = {
  create: async (
    params: Omit<Account, 'id'>,
    repository: IAccountRepository,
    tx: Prisma.TransactionClient,
  ): Promise<TaskEither<LogicalError, Account>> => {
    return pipe(
      findByEmailTE(params.email, repository, tx),
      chain((existingAccount) =>
        existingAccount ? leftTE<LogicalError>({ message: `existed user : ${params.email}` }) : rightTE(params),
      ),
      chain(() => hashPasswordTE(params.password)),
      chain((hashedPassword) => createAccountTE({ ...params, password: hashedPassword }, repository, tx)),
    );
  },
  login(
    params: { email: string; password: string },
    repository: IAccountRepository,
    tx: Prisma.TransactionClient,
  ): Promise<TaskEither<LogicalError, Account>> {
    // return pipe(
    //   findByEmailTE(params.email, repository, tx),
    //   chain((account) =>
    //     account ? verifyPasswordTE(params.password, account) : leftTE({ message: 'Account not found.' }),
    //   ),
    // );
    throw new Error();
  },
};
