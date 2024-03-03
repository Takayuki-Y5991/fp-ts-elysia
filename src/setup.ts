import { Elysia } from 'elysia';
import { PrismaTaskRepository } from './repository/task.repository';
import prisma from './plugins/config/prisma.plugin';

export const setup = new Elysia({ name: 'setup' }).decorate({
  taskRepository: new PrismaTaskRepository(prisma),
});
