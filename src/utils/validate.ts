import { either } from 'fp-ts';
import { fold } from 'fp-ts/Either';
import { TaskEither, right, left, tryCatch } from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { logger } from './logger';

type Validation<E, A> = (value: A) => either.Either<E, A>;

const validate = <E, A>(value: A, ...validators: Validation<E, A>[]): TaskEither<E, A> => {
  const applyValidators = (currentValue: A): either.Either<E, A> => {
    for (let validator of validators) {
      const result = validator(currentValue);
      if (either.isLeft(result)) {
        return result;
      }
    }
    return either.right(currentValue);
  };
  return pipe(
    applyValidators(value),
    fold(
      (e) => left(e),
      (a) => right(a),
    ),
  );
};

export { Validation, validate };

interface LogicalError {
  message: string;
}

const withLoggingAndCatch = <A>(operation: () => Promise<A>, errorMessage: string): TaskEither<LogicalError, A> => {
  return tryCatch(
    () => {
      return operation();
    },
    (error: unknown): LogicalError => {
      logger.error(`operation failed`, error);
      return { message: errorMessage };
    },
  );
};

export { withLoggingAndCatch, LogicalError };
