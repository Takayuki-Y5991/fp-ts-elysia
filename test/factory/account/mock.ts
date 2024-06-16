import { faker } from '@faker-js/faker';

interface IMockAccount {
  id: string;
  externalId: string;
  provider: 'email' | 'github' | 'google';
  name: string;
  email: string;
  role: 'admin' | 'customer';
}
interface ArgMockAccount extends Partial<IMockAccount> {}

export const buildMockAccount = ({ id, externalId, provider, name, email, role }: ArgMockAccount): IMockAccount => {
  return {
    id: id || faker.string.uuid(),
    externalId: externalId || faker.string.alpha(16),
    provider: provider || 'email',
    name: name || faker.internet.userName(),
    email: email || faker.internet.email(),
    role: role || 'customer',
  };
};
