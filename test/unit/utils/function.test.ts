import { describe, expect, it } from 'bun:test';
import { head } from '../../../src/utils/function';

describe('head', () => {
  it('should return the first element of an array', () => {
    const array: number[] = Array(3).fill([], 1, 3);
    const actual = head(array);
    expect(actual).toBe(1);
  });
  it('should return undefined for an empty array', () => {
    const array: number[] = [];
    const actual = head(array);
    expect(actual).toBeUndefined();
  });
});
