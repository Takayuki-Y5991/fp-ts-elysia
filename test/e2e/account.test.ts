import { treaty } from '@elysiajs/eden';

import { describe, expect, it } from 'bun:test';
import { buildMockAccount } from '../factory/account/mock';
import { e2eClient } from '../setup';
import { generateRandomString } from '../factory/mock';

const api = await e2eClient();
const client = treaty<typeof api>('localhost:3000');

describe('Account Routes', () => {
  it('create an account successfully', async () => {
    const _expect = buildMockAccount({});
    const { data } = await client.accounts.post(_expect);
    expect(data?.id).toBeTruthy();
    expect(data?.email).toBe(_expect.email);
    expect(data?.name).toBe(_expect.name);
    expect(data?.role).toBe(_expect.role);
    expect(data?.createdAt).toBeTruthy();
    expect(data?.updatedAt).toBeTruthy();
  });
  it('create an account failure by password short', async () => {
    const _expect = buildMockAccount({
      password: generateRandomString(7),
    });
    const { data, error } = await client.accounts.post(_expect);
    expect(data).toBeNull();
    expect(error?.status).toBe(400);
    expect(error?.value).toEqual({ message: 'Password must 8 to 100 count' });
  });
});
