import { Elysia, Static, t } from 'elysia';

const Error = t.Object({
  message: t.String({
    description: 'error messages',
  }),
});

const DefaultBadRequest = t.String({
  description: 'error messages',
});

export type MError = Static<typeof Error>;

export const error = new Elysia().model({
  error: Error || DefaultBadRequest,
});
