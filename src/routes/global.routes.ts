import { Elysia } from 'elysia';

export const globalRoutes = new Elysia().get('/health', () => {
  return { message: `Server Status : ${'OK'}` };
});
