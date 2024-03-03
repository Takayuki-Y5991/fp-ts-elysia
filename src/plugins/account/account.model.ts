import { Elysia, Static, t } from 'elysia';

const account = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String({
    format: 'email',
  }),
  password: t.String({
    maxLength: 100,
    minLength: 8,
    // pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[W_]).+$',
  }),
});

export type Account = Static<typeof account>;

const createRequest = t.Omit(account, ['id']);

export type AccountCreateRequest = Static<typeof createRequest>;

const loginRequest = t.Omit(account, ['id', 'name']);

export type LoginRequest = Static<typeof loginRequest>;

export const accountModel = new Elysia().model({
  'account.account': account,
  'account.createAccount': createRequest,
  'account.login': loginRequest,
});
