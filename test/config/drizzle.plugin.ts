import * as schema from '@/schema';
import { error } from '@/types/model/error.model';
import { sql } from 'drizzle-orm';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import Elysia from 'elysia';
import { Pool } from 'pg';
import { createDatabaseMessage } from './figlet';

export type PostgresDB = NodePgDatabase<typeof schema>;

export class DatabaseManager {
  private static instance: DatabaseManager;
  public pool: Pool;
  public client: PostgresDB;

  private constructor(connection: string) {
    this.pool = new Pool({ connectionString: connection });
    this.client = drizzle(this.pool, { logger: false, schema });
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
    this.client = drizzle(this.pool, { logger: false, schema });
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

export const globalSetup = (client: PostgresDB) =>
  new Elysia({ name: 'setup' }).use(error).decorate({
    client: client,
  });
