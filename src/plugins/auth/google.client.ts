import { LoginTicket, TokenPayload } from 'google-auth-library';
import { GoogleOauth } from '../../types/unionTypes';

export interface IGoogleAccountToken extends TokenPayload {}

export interface IGoogleClient {
  verifyToken(token: string, client: GoogleOauth): Promise<TokenPayload | undefined>;
}

export const GoogleClient: IGoogleClient = {
  verifyToken: async (token: string, client: GoogleOauth): Promise<IGoogleAccountToken | undefined> => {
    const ticket: LoginTicket = await client.verifyIdToken({
      idToken: token,
    });
    return ticket.getPayload();
  },
};
