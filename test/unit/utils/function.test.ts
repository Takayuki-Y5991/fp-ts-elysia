import { describe, expect, it } from 'bun:test';
import { head, ifPresent } from '../../../src/utils/function';

describe('head', () => {
  it('should return the first element of an array', () => {
    const array: number[] = [1, 2, 3];
    const actual = head(array);
    expect(actual).toBe(1);
  });
  it('should return undefined for an empty array', () => {
    const array: number[] = [];
    const actual = head(array);
    expect(actual).toBeUndefined();
  });
});

describe('ifPresent', () => {
  it('should return true', () => {
    const actual = ifPresent({ fn: 'ifPresent' });
    expect(actual).toBeTruthy();
  });
  it('should return false', () => {
    const actual = ifPresent(undefined);
    expect(actual).toBeFalsy();
  });
});
