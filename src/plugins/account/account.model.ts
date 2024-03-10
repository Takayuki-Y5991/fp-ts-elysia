import { Elysia, Static, t } from 'elysia';

const account = t.Object({
  id: t.String({
    description: 'A unique identifier for the account',
    default: crypto.randomUUID(),
  }),
  name: t.String({
    default: 'anonymous',
  }),
  email: t.String({
    format: 'email',
    default: 'anonymous@example.com',
    error: 'email must be a valid email address',
  }),
  password: t.String({
    maxLength: 100,
    minLength: 8,
    default: crypto.randomUUID(),
    error: 'Password must 8 to 100 count',
  }),
});

export type Account = Static<typeof account>;

const createRequest = t.Omit(account, ['id']);

const returnAccount = t.Omit(account, ['password']);

export type OmitAccount = Static<typeof returnAccount>;

const loginRequest = t.Omit(account, ['id', 'name']);

export type LoginRequest = Static<typeof loginRequest>;

export const accountModel = new Elysia().model({
  account: account,
  createAccount: createRequest,
  returnAccount: returnAccount,
  login: loginRequest,
});
