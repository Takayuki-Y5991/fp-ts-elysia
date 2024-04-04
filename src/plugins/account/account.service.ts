import { IAccountRepository } from './account.repository';
import { pipe } from 'fp-ts/function';
import { TaskEither, chain, right as rightTE, left as leftTE } from 'fp-ts/TaskEither';
import { hashPassword, verifyPassword } from '../../utils/password';
import { withLoggingAndCatch } from '../../utils/validate';
import { LogicalError } from '../../types/errorTypes';
import { PgTransactionT } from '../../types/configTypes';

interface Account {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  createdAt: Date;
  updatedAt: Date;
}

interface CreateAccount {
  role?: 'admin' | 'customer';
  password: string;
  name: string;
  email: string;
}

export const findByEmailTE = (email: string, repository: IAccountRepository, tx: PgTransactionT): TaskEither<LogicalError, Account> =>
  withLoggingAndCatch(() => repository.findByEmail(email, tx), 'DATABASE_ERROR', 'Email already exists in the database.');

export const createAccountTE = (
  account: CreateAccount & { password: string },
  repository: IAccountRepository,
  tx: PgTransactionT,
): TaskEither<LogicalError, Account> => withLoggingAndCatch(() => repository.create(account, tx), 'DATABASE_ERROR', 'Failed to create account.');

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

export interface IAccountService {
  create(params: CreateAccount, repository: IAccountRepository, tx: PgTransactionT): Promise<TaskEither<LogicalError, Omit<Account, 'password'>>>;
}

export const AccountService: IAccountService = {
  create: async (
    params: CreateAccount,
    repository: IAccountRepository,
    tx: PgTransactionT,
  ): Promise<TaskEither<LogicalError, Omit<Account, 'password'>>> => {
    return pipe(
      findByEmailTE(params.email, repository, tx),
      chain((existingAccount) =>
        existingAccount ? leftTE<LogicalError>({ message: `existed user : ${params.email}`, status: 'INVALID_ERROR' }) : rightTE(params),
      ),
      chain(() => hashPasswordTE(params.password)),
      chain((hashedPassword) => createAccountTE({ ...params, password: hashedPassword }, repository, tx)),
    );
  },
};
