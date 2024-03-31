import swagger from '@elysiajs/swagger';
import { Elysia, t } from 'elysia';
import { errorHandler, globalSetup } from './setup';
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
  .use(errorHandler)
  .listen(3000);

serverRunMessage();

export type App = typeof app;
