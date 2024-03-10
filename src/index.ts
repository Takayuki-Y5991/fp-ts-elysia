import swagger from '@elysiajs/swagger';
import { Elysia, t } from 'elysia';
import prisma, { withTransaction } from './plugins/config/prisma.plugin';
import { errorHandler, globalSetup } from './setup';
import { accountModel } from './plugins/account/account.model';
import { routes } from './routes/index.routes';

export const app = new Elysia()
  .trace(async ({ handle }) => {
    const { time, end } = await handle;
    console.log(`Request took`, (await end) - time);
  })
  .use(swagger())
  .use(globalSetup)
  .use(routes)
  .use(errorHandler)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
