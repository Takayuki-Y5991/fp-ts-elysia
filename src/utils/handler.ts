import { pipe } from 'fp-ts/lib/function';
import { ErrorType, LogicalError } from '../types/errorTypes';
import { TaskEither, match } from 'fp-ts/TaskEither';
import { error } from 'elysia';

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
      return error('Bad Request', message);
    case 'AUTHENTICATION_ERROR':
      return error('Forbidden', message);
    case 'DATABASE_ERROR' || 'INTERNAL_SERVER_ERROR':
      return error('Internal Server Error', message);
    default:
      return new Error('No implement......');
  }
};

export { handleTE };
