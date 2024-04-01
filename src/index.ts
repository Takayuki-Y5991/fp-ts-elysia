import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { globalSetup } from './setup';
import { routes } from './routes/index.routes';
import { serverRunMessage } from './plugins/config/figlet';

export const app = new Elysia()
  .trace(async ({ handle }) => {
    const { time, end } = await handle;
    console.log(`Request took`, (await end) - time);
  })
  .use(swagger())
  .use(globalSetup)
  .use(routes)
  .listen(3000);

serverRunMessage();

export type App = typeof app;
