import { OAuth2Client } from 'google-auth-library';

const Priority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export { Priority };

export type GoogleOauth = OAuth2Client;
