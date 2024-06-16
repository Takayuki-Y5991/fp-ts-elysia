import { LoginTicketT } from '@/types/config.type';
import { Effect as E } from 'effect';

export interface IGoogleClient {
  verifyToken(token: string): E.Effect<LoginTicketT, Error, never>;
}
