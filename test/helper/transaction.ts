import { PostgresDB, client } from '../../src/plugins/config/drizzie.plugin';
import { logger } from '../../src/plugins/config/logger.plugin';
import { PgTransactionT } from '../../src/types/configTypes';

export const safeTestTransaction = async (client: PostgresDB, fn: any) => {
  try {
    await runTestTransaction(client, fn);
  } catch (e) {
    if (!(e instanceof Error)) logger.debug(e);
    // NOTE: This is where non-Error object handling logic would go.
  }
};

const runTestTransaction = async (client: PostgresDB, fn: any) =>
  await client.transaction(
    async (tx: PgTransactionT): Promise<void> => {
      await fn(tx);
      throw new Error('trigger rollback');
    },
    {
      accessMode: 'read write',
      isolationLevel: 'read committed',
    },
  );
