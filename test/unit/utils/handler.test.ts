import { describe, it, expect, jest, mock } from 'bun:test';
import { TaskEither, right, left } from 'fp-ts/lib/TaskEither';
import { LogicalError } from '../../../src/types/errorTypes';
import { handleTE } from '../../../src/utils/handler';
import { error as elysiaError } from 'elysia';

describe('handleTE', () => {
  it('should handle successful TaskEither', async () => {
    const te: TaskEither<LogicalError, string> = right('success');

    const result = await handleTE(te);
    expect(result).toEqual('success');
  });
  it('should handle TaskEither with INVALID_ERROR', async () => {
    const err: LogicalError = { status: 'INVALID_ERROR', message: 'Invalid input' };
    const te: TaskEither<LogicalError, string> = left(err);
    try {
      await handleTE(te);
    } catch (receivedError) {
      expect(receivedError).toEqual(elysiaError('Bad Request', 'Invalid input'));
    }
  });
  it('should handle TaskEither with AUTHENTICATION_ERROR', async () => {
    const err: LogicalError = { status: 'AUTHENTICATION_ERROR', message: 'This operation is not permitted.' };
    const te: TaskEither<LogicalError, string> = left(err);
    try {
      await handleTE(te);
    } catch (receivedError) {
      expect(receivedError).toEqual(elysiaError('Forbidden', 'This operation is not permitted.'));
    }
  });
  it('should handle TaskEither with INTERNAL_SERVER_ERROR', async () => {
    const err: LogicalError = { status: 'INTERNAL_SERVER_ERROR', message: 'Unexpected error.' };
    const te: TaskEither<LogicalError, string> = left(err);
    try {
      await handleTE(te);
    } catch (receivedError) {
      expect(receivedError).toEqual(elysiaError('Internal Server Error', 'Unexpected error.'));
    }
  });
});
