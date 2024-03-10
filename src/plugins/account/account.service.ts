import { IAccountRepository } from './account.repository';
import { Prisma } from '@prisma/client';
import { pipe } from 'fp-ts/function';
import { TaskEither, chain, right as rightTE, left as leftTE } from 'fp-ts/TaskEither';
import { hashPassword, verifyPassword } from '../../utils/password';
import { withLoggingAndCatch } from '../../utils/validate';
import { LogicalError } from '../../types/errorTypes';
import { Account, OmitAccount } from './account.model';

export const findByEmailTE = (
  email: string,
  repository: IAccountRepository,
  tx: Prisma.TransactionClient,
): TaskEither<LogicalError, Account | null> =>
  withLoggingAndCatch(() => repository.findByEmail(email, tx), 'DATABASE_ERROR', 'Email already exists in the database.');

export const createAccountTE = (
  account: Omit<Account, 'id'> & { password: string },
  repository: IAccountRepository,
  tx: Prisma.TransactionClient,
): TaskEither<LogicalError, Account> =>
  withLoggingAndCatch(() => repository.create(account, tx), 'DATABASE_ERROR', 'Failed to create account.');

export const hashPasswordTE = (password: string): TaskEither<LogicalError, string> =>
  withLoggingAndCatch(() => hashPassword(password), 'INVALID_ERROR', 'Password hashing failed.');

export const verifyPasswordTE = (password: string, user: Account): TaskEither<LogicalError, Account> =>
  withLoggingAndCatch(
    async () => {
      const isPasswordValid = await verifyPassword(password, user.password);
      if (!isPasswordValid) throw new Error('Invalid password');
      return user;
    },
    'INVALID_ERROR',
    'Password verification failed',
  );

export const generateToken = (account: Account): TaskEither<LogicalError, string> =>
  withLoggingAndCatch(
    async () => {
      // FIXME: TOKEN GENERATE
      const token = 'AA';
      return token;
    },
    'INTERNAL_SERVER_ERROR',
    'Failed to generate token',
  );

export interface IAccountService {
  create(
    params: Omit<Account, 'id'>,
    repository: IAccountRepository,
    tx: Prisma.TransactionClient,
  ): Promise<TaskEither<LogicalError, OmitAccount>>;
  login(
    params: { email: string; password: string },
    repository: IAccountRepository,
    tx: Prisma.TransactionClient,
  ): Promise<TaskEither<LogicalError, string>>;
}

export const AccountService: IAccountService = {
  create: async (
    params: Omit<Account, 'id'>,
    repository: IAccountRepository,
    tx: Prisma.TransactionClient,
  ): Promise<TaskEither<LogicalError, OmitAccount>> => {
    return pipe(
      findByEmailTE(params.email, repository, tx),
      chain((existingAccount) =>
        existingAccount ? leftTE<LogicalError>({ message: `existed user : ${params.email}`, status: 'INVALID_ERROR' }) : rightTE(params),
      ),
      chain(() => hashPasswordTE(params.password)),
      chain((hashedPassword) => createAccountTE({ ...params, password: hashedPassword }, repository, tx)),
    );
  },
  login: async (
    params: { email: string; password: string },
    repository: IAccountRepository,
    tx: Prisma.TransactionClient,
  ): Promise<TaskEither<LogicalError, string>> => {
    return pipe(
      findByEmailTE(params.email, repository, tx),
      chain((account) =>
        account
          ? verifyPasswordTE(params.password, account)
          : leftTE<LogicalError>({ message: 'Account not found.', status: 'INVALID_ERROR' }),
      ),
      chain((account) => generateToken(account)),
    );
  },
};
