import { faker } from '@faker-js/faker';

interface IMockAccount {
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'customer';
}

export const buildMockAccount = ({ name, email, password, role }: IMockAccount) => {
  return {
    name: name || faker.internet.userName(),
    email: email || faker.internet.email(),
    password: password || faker.internet.password(),
    role: role || 'customer',
  };
};
