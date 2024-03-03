import { Elysia, Static, t } from 'elysia';
import { AccountRepository } from './account.repository';

const account = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String({
    format: 'email',
  }),
  password: t.String({
    maxLength: 100,
    minLength: 8,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[W_]).+$',
  }),
});

export type Account = Static<typeof account>;

const createRequest = t.Omit(account, ['id']);

export type AccountCreateRequest = Static<typeof createRequest>;

export const authModel = new Elysia().model({
  'auth.account': account,
  'auth.createAccount': createRequest,
});
