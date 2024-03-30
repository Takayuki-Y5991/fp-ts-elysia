import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../../src/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { sql } from 'drizzle-orm';
import { createDatabaseMessage } from './figlet';

export type PostgresDB = NodePgDatabase<typeof schema>;

export class DatabaseManager {
  private static instance: DatabaseManager;
  public pool: Pool;
  public client: PostgresDB;

  private constructor(connection: string) {
    this.pool = new Pool({ connectionString: connection });
    this.client = drizzle(this.pool, { logger: true, schema });
  }
  public static getInstance(connection?: string): DatabaseManager {
    if (!DatabaseManager.instance && connection) {
      DatabaseManager.instance = new DatabaseManager(connection);
    }
    return DatabaseManager.instance;
  }
  public async updateConnection(connection: string) {
    await this.pool.end();
    this.pool = new Pool({ connectionString: connection });
    this.client = drizzle(this.pool, { logger: true, schema });
  }
}

export const setupDatabase = async (): Promise<PostgresDB> => {
  const manager = DatabaseManager.getInstance('postgresql://api:p@ssw0rd@localhost:5432/postgres');
  if (!(await hasDatabase(manager))) {
    createDatabaseMessage();
    await manager.client.execute(sql`CREATE DATABASE test_db`);
  }
  await manager.updateConnection('postgresql://api:p@ssw0rd@localhost:5432/test_db');
  return manager.client;
};

export const closeDatabase = async () => {
  const manager = DatabaseManager.getInstance();
  await manager.pool.end();
};

const hasDatabase = async (manager: DatabaseManager): Promise<boolean> => {
  const result = await manager.client.execute(sql`SELECT EXISTS (SELECT FROM pg_database WHERE datname = 'test_db')`);
  return result.rows[0].exists as boolean;
};
