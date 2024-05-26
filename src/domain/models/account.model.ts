import { provider } from './../../schema';
export interface Account {
  id: string;
  externalId: string;
  provider: 'email' | 'github' | 'google';
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface CreateAccount {
  role?: 'admin' | 'customer';
  name: string;
  email: string;
}
