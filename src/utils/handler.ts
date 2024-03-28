import { pipe } from 'fp-ts/lib/function';
import { ErrorType, LogicalError } from '../types/errorTypes';
import { TaskEither, match } from 'fp-ts/TaskEither';
import { error } from 'elysia';
import { PgTransaction } from 'drizzle-orm/pg-core';

const handleTE = (taskEither: TaskEither<LogicalError, any>): Promise<any> =>
  pipe(
    taskEither,
    match(
      (left: LogicalError) => Promise.reject(toResponseStatus(left)),
      (right: any) => Promise.resolve(right),
    ),
  )();

const toResponseStatus = ({ status, message }: { status: ErrorType; message: string }) => {
  switch (status) {
    case 'INVALID_ERROR':
      return error('Bad Request', { message: message });
    case 'AUTHENTICATION_ERROR':
      return error('Forbidden', { message: message });
    case 'DATABASE_ERROR':
    case 'INTERNAL_SERVER_ERROR':
      return error('Internal Server Error', { message: message });
  }
};

export { handleTE };
