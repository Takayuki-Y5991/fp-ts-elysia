export type ErrorType = 'INVALID_ERROR' | 'AUTHENTICATION_ERROR' | 'INTERNAL_SERVER_ERROR' | 'DATABASE_ERROR';

export interface LogicalError {
  message: string;
  status: ErrorType;
}
