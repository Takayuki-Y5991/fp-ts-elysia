import swagger from '@elysiajs/swagger';
import { Elysia, t } from 'elysia';
import { Task, taskModel } from './models/task.model';
import { PrismaTaskRepository } from './repository/task.repository';
import { PrismaClient } from '@prisma/client';
import prisma from './plugins/config/prisma.plugin';
import { setup } from './setup';
import { accountModel } from './plugins/account/account.model';

export const app = new Elysia()
  .trace(async ({ handle }) => {
    const { time, end } = await handle;
    console.log(`Request took`, (await end) - time);
  })
  .use(swagger())
  .use(taskModel)
  .use(accountModel)
  .use(setup)
  .post(
    '/test',
    ({ body }) => {
      console.log('Body', body);
      return {
        id: '7537FB12-6010-4F01-B420-B5AEBE834A85',
        title: 'test',
        description: 'test',
        priority: 'high',
        storyId: '7537FB12-6010-4F01-B420-B5AEBE834A85',
      } as Task;
    },
    { body: 'task.create', response: 'task.task' },
  )
  .get('/task', ({ taskRepository }) => {
    return taskRepository.fetchAll();
  })
  .post(
    '/accounts',
    ({ prisma, accountRepository, accountService, body }) => {
      return accountService.create(body, accountRepository, prisma);
    },
    {
      body: 'account.createAccount',
    },
  )
  // .get('/', () => 'Hello Elysia')
  // .get('/id/:id', ({ params: { id } }) => id, {
  //   params: t.Object({
  //     id: t.Numeric(),
  //   }),
  // })
  // .onError(({ code }: { code: string }) => {
  //   if (code === 'NOT_FOUND') return "ID doesn't exist";
  // })
  .get('/tasks', () => {
    return { message: 'TASKS' };
  })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
