import { either } from 'fp-ts';
import { Either, fold } from 'fp-ts/Either';
import { TaskEither, right, left, tryCatch } from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { logger } from './logger';
import { ErrorType, LogicalError } from '../types/errorTypes';

type Validation<E, A> = (value: A) => either.Either<E, A>;

const validate = <E, A>(value: A, ...validators: Validation<E, A>[]): TaskEither<E, A> => {
  const validateInternal = (acc: Either<E, A>, validators: Validation<E, A>[]): Either<E, A> => {
    if (validators.length === 0) return acc;

    const [head, ...tail] = validators;
    return either.chain(head)(acc) as Either<E, A>;
  };

  return pipe(
    validateInternal(either.right(value), validators),
    fold(
      (e) => left(e),
      (a) => right(a),
    ),
  );
};

export { Validation, validate };

const withLoggingAndCatch = <A>(operation: () => Promise<A>, errorType: ErrorType, errorMessage: string): TaskEither<LogicalError, A> => {
  return tryCatch(
    () => {
      return operation();
    },
    (error: unknown): LogicalError => {
      logger.error(`operation failed: ${error}`);
      logger.error(`Cause of error ${errorMessage}`);
      return { message: errorMessage, status: errorType };
    },
  );
};

export { withLoggingAndCatch };
