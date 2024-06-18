import { t } from 'elysia';

export const account = t.Object({
  id: t.String({
    description: 'A unique identifier for the account',
    default: crypto.randomUUID(),
  }),
  externalId: t.String({
    description: 'Third party library uid',
  }),
  provider: t.Union([t.Literal('email'), t.Literal('github'), t.Literal('google')], {
    description: 'authenticate provider, email or github, google',
  }),
  name: t.String({
    description: 'account name',
    maxLength: 100,
  }),
  email: t.String({
    format: 'email',
    default: 'anonymous@example.com',
    error: 'email must be a valid email address',
  }),
  role: t.Union([t.Literal('admin', { description: 'admin grant' }), t.Literal('customer', { description: 'customer grant' })], {
    default: 'customer',
    error: 'role choose one , admin or customer',
  }),
});
