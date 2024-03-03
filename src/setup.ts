import { Elysia } from 'elysia';
import { PrismaTaskRepository } from './repository/task.repository';
import prisma from './plugins/config/prisma.plugin';
import { AccountRepository } from './plugins/account/account.repository';
import { AccountService } from './plugins/account/account.service';

export const setup = new Elysia({ name: 'setup' })
  .decorate({
    taskRepository: new PrismaTaskRepository(prisma),
  })
  .decorate({
    prisma: prisma,
    accountRepository: AccountRepository,
    accountService: AccountService,
  });
