import { describe, it, expect } from 'bun:test';
import { Validation, validate, withLoggingAndCatch } from '../../src/utils/validate';
import { either } from 'fp-ts';

const isString: Validation<string, any> = (value) => (typeof value === 'string' ? either.right(value) : either.left('Not a string'));
const isNonEmptyString: Validation<string, string> = (value) => (value !== '' ? either.right(value) : either.left('Empty string'));

describe('validate', () => {
  it('should return the original value if all validations pass', async () => {
    const result = await validate('test', isString)();
    expect(result).toEqual(either.right('test'));
  });
  it('should return an error if a validation fails', async () => {
    const result = await validate('', isNonEmptyString)();
    expect(result).toEqual(either.left('Empty string'));
  });
});

describe('withLoggingAndCatch', () => {
  it('withLoggingAndCatch returns Right on successful operation', async () => {
    const operation = async () => 'success';
    const result = await withLoggingAndCatch(operation, 'INTERNAL_SERVER_ERROR', 'Something went wrong')();
    expect(result).toEqual(either.right('success'));
  });
  it('withLoggingAndCatch returns Left with LogicalError on failure', async () => {
    const operation = async () => {
      throw new Error();
    };
    const result = await withLoggingAndCatch(operation, 'INTERNAL_SERVER_ERROR', 'Something went wrong')();
    expect(result).toEqual(either.left({ message: 'Something went wrong', status: 'INTERNAL_SERVER_ERROR' }));
  });
});
