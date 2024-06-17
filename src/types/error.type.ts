import { error as ElysiaError } from 'elysia';

export class InvalidParameterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Invalid Parameter Error';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Authentication Error';
  }
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Database Error';
  }
}

export const ERROR_MAP = new Map<new (message: string) => Error, (message: string) => any>([
  [InvalidParameterError, (message) => ElysiaError('Bad Request', { message })],
  [AuthenticationError, (message) => ElysiaError('Forbidden', { message })],
  [DatabaseError, (message) => ElysiaError('Internal Server Error', { message })],
]);
