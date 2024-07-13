import { ERROR_MAP } from '@/types/error.type';
import { Value } from '@sinclair/typebox/value';

import { Effect as E } from 'effect';
import { error as ElysiaError, TSchema } from 'elysia';

export const handleEffect = async <R>(effect: E.Effect<R, Error, never>): Promise<R> => {
  return E.runPromise(effect)
    .then((e) => {
      return e;
    })
    .catch((err) => errorToResponse(err));
};

export const converter = <T>(result: any, schema: TSchema): E.Effect<T, Error, never> => E.succeed(Value.Clean(schema, result) as T);
const errorToResponse = (error: Error) => {
  const err = ERROR_MAP.get(error.constructor as new (message: string) => Error);
  return err ? err(error.message) : ElysiaError('Internal Server Error', { message: error.message });
};
