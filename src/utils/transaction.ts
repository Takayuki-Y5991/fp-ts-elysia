import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../../src/schema';
import { sql } from 'drizzle-orm';

//  @deprecated
export type Database = PostgresJsDatabase<typeof schema>;

//  @deprecated
type Transaction = {
  db: Database;
  nestedIndex: number;
  savePoint: string;
  transaction: <T>(tx: (t: Transaction) => Promise<T>) => Promise<T>;
  rollback: () => void;
};

//  @deprecated
export const createTransaction = (db: Database, nestedIndex: number = 0, savePoint: string = 'sp0'): Transaction => {
  return {
    db,
    nestedIndex,
    savePoint,
    transaction: async <T>(tx: (t: Transaction) => Promise<T>): Promise<T> => {
      const _savePoint = savePoint;
      await db.execute(sql`SAVEPOINT ${_savePoint}`);
      const t = createTransaction(db, nestedIndex + 1, `sp${nestedIndex + 1}`);

      try {
        const result = await tx(t);
        await db.execute(sql`RELEASE SAVEPOINT ${_savePoint}`);
        return result;
      } catch (e) {
        await db.execute(sql`ROLLBACK TO SAVEPOINT ${_savePoint}`);
        throw e;
      }
    },
    rollback: () => {
      throw new Error('Rollback called. Reverting transaction');
    },
  };
};
