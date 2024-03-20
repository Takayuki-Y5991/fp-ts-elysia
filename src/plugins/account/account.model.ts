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
  role: t.Union([t.Literal('admin', { description: 'admin grant' }), t.Literal('customer', { description: 'customer grant' })], {
    default: 'customer',
    error: 'role choose one , admin or customer',
  }),
  createdAt: t.Date({ default: new Date() }),
  updatedAt: t.Date({ default: new Date() }),
});

/** Basic Model */
export type Account = Static<typeof account>;

const OIdCreatedAtUpdatedAtAccount = t.Omit(account, ['id', 'createdAt', 'updatedAt']);
const OPIdCreatedAtUpdatedAtAccount = t.Composite([
  t.Omit(OIdCreatedAtUpdatedAtAccount, ['role']),
  t.Partial(t.Pick(OIdCreatedAtUpdatedAtAccount, ['role']), ['role']),
]);

export type CreateAccount = Static<typeof OPIdCreatedAtUpdatedAtAccount>;

const OPasswordAccount = t.Omit(account, ['password']);

export type OmitAccount = Static<typeof OPasswordAccount>;

export const accountModel = new Elysia().model({
  'account.create': OPIdCreatedAtUpdatedAtAccount,
  'account.return': OPasswordAccount,
});
