import { treaty } from '@elysiajs/eden';
import { e2eClient } from '../setup';
import { describe, expect, it } from 'bun:test';

const api = await e2eClient();
export const client = treaty<typeof api>('localhost:3000');

describe('Global Routes', () => {
  it('health check successfully', async () => {
    const { data } = await client.health.get();
    expect(data?.message).toBe('Server Status : OK');
  });
});
