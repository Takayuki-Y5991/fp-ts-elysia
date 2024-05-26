import { GoogleClientT, TokenPayloadT } from '@/types/configTypes';
import { Effect as E } from 'effect';

export interface IGoogleClient {
  verifyToken(token: string, client: GoogleClientT): E.Effect<TokenPayloadT, Error, never>;
}
