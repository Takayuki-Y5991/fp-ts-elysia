import { converter } from '@/utils/handler';
import { describe, expect, it } from 'bun:test';
import { Effect as E } from 'effect';

// describe('handleEffect', () => {
//   it('should return the result of a successful effect', async () => {
//     const effect = E.succeed('success');
//     const result = await handleEffect(effect);
//     expect(result).toBe('success');
//   });

//   it('should throw an error for a failed effect', async () => {
//     const effect = E.fail(new Error('failure'));
//     await expect(handleEffect(effect)).rejects.toThrow('failure');
//   });

//   it('should convert an error to a response', async () => {
//     const effect = E.fail(new Error('Not Found'));
//     const result = await handleEffect(effect);
//     expect(result).toBeInstanceOf(ElysiaError);
//     expect(result.status).toBe(404);
//     expect(result.message).toBe('Not Found');
//   });
// });

describe('converter', () => {
  it('should return the result if it matches the schema', () => {
    const result = { foo: 'bar' };
    const schema = { type: 'object', properties: { foo: { type: 'string' } } };
    const effect = converter(result, schema);
    expect(E.runSync(effect)).toEqual(result);
  });

  it('should throw an error if the result does not match the schema', () => {
    const result = { foo: 123 };
    const schema = { type: 'object', properties: { foo: { type: 'string' } } };
    const effect = converter(result, schema);
    expect(async () => E.runSync(effect)).toThrow();
  });
});
