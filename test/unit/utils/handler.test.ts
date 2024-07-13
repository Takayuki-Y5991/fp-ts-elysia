import { converter } from '@/utils/handler';
import { describe, expect, it } from 'bun:test';
import { Effect as E } from 'effect';
import { Static, t } from 'elysia';

describe('converter', () => {
  it('should convert a valid result to the expected type', async () => {
    const schema = t.Object({
      name: t.String(),
      age: t.Number(),
    });
    type Schema = Static<typeof schema>;

    const result = {
      name: 'John Doe',
      age: 30,
      exclude: 'test',
    };

    const expected = {
      name: 'John Doe',
      age: 30,
    };

    const effect = converter<Schema>(result, schema);
    const actual = await E.runPromise(effect);

    expect(actual).toEqual(expected);
    expect(actual).not.toContainKey('exclude');
  });

  it('should throw an error for an invalid result', async () => {
    const schema = t.Object({
      name: t.String(),
      age: t.Number(),
      include: t.Union([t.String(), t.Undefined()]),
    });

    type Schema = Static<typeof schema>;

    const result = {
      name: 'John Doe',
      age: 30,
    };

    const expected = {
      name: 'John Doe',
      age: 30,
    };

    const effect = converter<Schema>(result, schema);
    const actual = await E.runPromise(effect);

    expect(actual).not.toBe(expected);
    expect(actual).not.toContainKey('include');
    expect(actual.include).toBeUndefined();
  });
});
