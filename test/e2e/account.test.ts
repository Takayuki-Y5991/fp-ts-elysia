import { treaty } from '@elysiajs/eden';

import { e2eClient } from '../setup';

const api = await e2eClient();
const client = treaty<typeof api>('localhost:3000');

// describe('Account Routes', () => {
//   it('create an account successfully', async () => {
//     const _expect = buildMockAccount({});
//     const { data } = await client.accounts.post(_expect);
//     expect(data?.email).toBe(_expect.email);
//     expect(data?.name).toBe(_expect.name);
//     expect(data?.role).toBe(_expect.role);
//   });
//   it('create an account failure by password short', async () => {
//     const { data, error } = await client.accounts.post(_expect);
//     expect(data).toBeNull();
//     expect(error?.status).toBe(400);
//     expect(error?.value).toEqual({ message: 'Password must 8 to 100 count' });
//   });
// });
