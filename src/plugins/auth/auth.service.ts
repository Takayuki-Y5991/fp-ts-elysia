import { TaskEither } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/function';
import { LogicalError } from '../../types/errorTypes';
import { withLoggingAndCatch } from '../../utils/validate';
import { GoogleOauth } from '../../types/unionTypes';
import { IGoogleAccountToken, IGoogleClient } from './google.client';
import { left as leftTE, chain, right as rightTE } from 'fp-ts/TaskEither';

interface TokenPayload {
  iss: string;
  at_hash?: string;
  email_verified?: boolean;
  sub: string;
  azp?: string;
  email?: string;
  profile?: string;
  picture?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  aud: string;
  iat: number;
  exp: number;
  nonce?: string;
  hd?: string;
  locale?: string;
}

export interface IAuthService {
  login(authentication: string, client: IGoogleClient, authClient: GoogleOauth): TaskEither<LogicalError, TokenPayload | undefined>;
}

const verifyToken = (token: string, client: IGoogleClient, authClient: GoogleOauth): TaskEither<LogicalError, TokenPayload | undefined> =>
  withLoggingAndCatch(() => client.verifyToken(token, authClient), 'AUTHENTICATION_ERROR', 'Invalid token');

export const AuthService: IAuthService = {
  login: (token: string, client: IGoogleClient, authClient: GoogleOauth): TaskEither<LogicalError, TokenPayload | undefined> =>
    pipe(
      verifyToken(token, client, authClient),
      chain((tokenPayload) =>
        tokenPayload ? leftTE<LogicalError>({ message: 'Invalid token', status: 'AUTHENTICATION_ERROR' }) : rightTE(tokenPayload),
      ),
    ),
};
