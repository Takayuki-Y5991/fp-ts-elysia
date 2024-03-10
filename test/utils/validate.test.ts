import { describe, it, expect } from 'bun:test';
import { Validation, validate } from '../../src/utils/validate';
import { either } from 'fp-ts';

const isString: Validation<string, any> = (value) => (typeof value !== 'string' ? either.right(value) : either.left('Not a string'));
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
