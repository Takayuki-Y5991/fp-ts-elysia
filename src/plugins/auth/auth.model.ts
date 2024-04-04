import { Elysia, Static, t } from 'elysia';

const login = t.Object({
  email: t.Optional(
    t.String({
      format: 'email',
      default: 'anonymous@example.com',
      error: 'email must be a valid email address',
    }),
  ),
  password: t.Optional(
    t.String({
      maxLength: 100,
      minLength: 8,
      default: crypto.randomUUID(),
      error: 'Password must 8 to 100 count',
    }),
  ),
  provider: t.Union([t.Literal('google'), t.Literal('basic')], {
    default: 'basic',
    description: 'basic authenticate or google auth2.0',
  }),
});

/** Basic Model */
export type Login = Static<typeof login>;

export const loginModel = new Elysia().model({
  'login.request': login,
});
