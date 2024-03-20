import { PostgresDB, client } from '../../src/plugins/config/drizzie.plugin';
import { PgTransactionT } from '../../src/types/configTypes';

export const runTestTransaction = async (client: PostgresDB, fn: any) =>
  await client.transaction(
    async (tx: PgTransactionT): Promise<void> => {
      try {
        await fn(tx);
      } finally {
        await tx.rollback();
      }
    },
    {
      accessMode: 'read write',
      isolationLevel: 'read committed',
    },
  );
