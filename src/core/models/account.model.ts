export interface Account {
  id: string;
  externalId: string;
  provider: 'email' | 'github' | 'google';
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface CreateAccount extends Omit<Account, 'id'> {}
