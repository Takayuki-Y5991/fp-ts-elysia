import { treaty } from '@elysiajs/eden';
import { describe, expect, it } from 'bun:test';
import { e2eClient } from '../setup';

const api = await e2eClient();
export const client = treaty<typeof api>('localhost:3000');

describe('Global Routes', () => {
  it('health check successfully', async () => {
    const { data } = await client.health.get();
    expect(data?.message).toBe('Server Status : OK');
  });
});
