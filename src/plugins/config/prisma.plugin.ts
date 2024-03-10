import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;

export const withTransaction = async <T>(prisma: PrismaClient, operation: (tx: Prisma.TransactionClient) => Promise<T>) => {
  return prisma.$transaction(
    async (tx) => {
      return await operation(tx);
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      maxWait: 5000,
      timeout: 10000,
    },
  );
};
