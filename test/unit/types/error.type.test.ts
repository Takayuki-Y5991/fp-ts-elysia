import { AuthenticationError, DatabaseError, ERROR_MAP, InvalidParameterError } from '@/types/error.type';
import { describe, expect, test } from 'bun:test';

describe('InvalidParameterError', () => {
  test('should be an instance of Error', () => {
    const error = new InvalidParameterError('Invalid parameter');
    expect(error).toBeInstanceOf(Error);
  });

  test('should have the correct name', () => {
    const error = new InvalidParameterError('Invalid parameter');
    expect(error.name).toBe('Invalid Parameter Error');
  });

  test('should have the correct message', () => {
    const error = new InvalidParameterError('Invalid parameter');
    expect(error.message).toBe('Invalid parameter');
  });
});

describe('AuthenticationError', () => {
  test('should be an instance of Error', () => {
    const error = new AuthenticationError('Authentication failed');
    expect(error).toBeInstanceOf(Error);
  });

  test('should have the correct name', () => {
    const error = new AuthenticationError('Authentication failed');
    expect(error.name).toBe('Authentication Error');
  });

  test('should have the correct message', () => {
    const error = new AuthenticationError('Authentication failed');
    expect(error.message).toBe('Authentication failed');
  });
});

describe('DatabaseError', () => {
  test('should be an instance of Error', () => {
    const error = new DatabaseError('Database error');
    expect(error).toBeInstanceOf(Error);
  });

  test('should have the correct name', () => {
    const error = new DatabaseError('Database error');
    expect(error.name).toBe('Database Error');
  });

  test('should have the correct message', () => {
    const error = new DatabaseError('Database error');
    expect(error.message).toBe('Database error');
  });
});

describe('ERROR_MAP', () => {
  test('should map InvalidParameterError to a Bad Request error', () => {
    const error = new InvalidParameterError('invalid parameter');
    const response = ERROR_MAP.get(error.constructor as new (message: string) => InvalidParameterError)!;
    expect(response(error.message).response.message).toBe('invalid parameter');
  });

  test('should map AuthenticationError to a Forbidden error', () => {
    const error = new AuthenticationError('Authentication failed');
    const response = ERROR_MAP.get(error.constructor as new (message: string) => AuthenticationError)!;
    expect(response(error.message).response.message).toBe('Authentication failed');
  });

  test('should map DatabaseError to an Internal Server Error', () => {
    const error = new DatabaseError('Database error');
    const response = ERROR_MAP.get(error.constructor as new (message: string) => DatabaseError)!;
    expect(response(error.message).response.message).toBe('Database error');
  });
});
