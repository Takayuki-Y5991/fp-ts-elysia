import { $Enums, PrismaClient, Task } from '@prisma/client';
import prisma from '../plugins/config/prisma.plugin';

export interface ITaskRepository {
  fetchAll(): Promise<Task[]>;
}

export class PrismaTaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaClient) {}

  async fetchAll(): Promise<Task[]> {
    return prisma.task.findMany();
  }
}
