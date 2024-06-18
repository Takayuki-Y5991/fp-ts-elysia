import { ERROR_MAP } from '@/types/error.type';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Effect as E } from 'effect';
import { error as ElysiaError } from 'elysia';

export const handleEffect = async <R>(effect: E.Effect<R, Error, never>): Promise<R> => {
  return E.runPromise(effect)
    .then((e) => {
      return e;
    })
    .catch((err) => errorToResponse(err));
};

const ajv = new Ajv({ removeAdditional: 'all' });
addFormats(ajv);

export const converter = <T>(result: any, schema: any): E.Effect<T, never, never> => {
  const validate = ajv.compile(schema);
  validate(result);
  return E.succeed(result as T);
};

const errorToResponse = (error: Error) => {
  const err = ERROR_MAP.get(error.constructor as new (message: string) => Error);
  return err ? err(error.message) : ElysiaError('Internal Server Error', { message: error.message });
};
