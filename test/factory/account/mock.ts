import { faker } from '@faker-js/faker';

interface IMockAccount {
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'customer';
}

interface IMockCreatedAccount extends IMockAccount {
  id?: string;
}

export const buildMockAccount = ({ name, email, password, role }: IMockAccount) => {
  return {
    name: name || faker.internet.userName(),
    email: email || faker.internet.email(),
    password: password || faker.internet.password(),
    role: role || 'customer',
  };
};

export const buildCreatedMockAccount = ({ id, name, email, password, role }: IMockCreatedAccount) => {
  return {
    id: id || crypto.randomUUID(),
    name: name || faker.internet.userName(),
    email: email || faker.internet.email(),
    password: password || faker.internet.password(),
    role: role || 'customer',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
