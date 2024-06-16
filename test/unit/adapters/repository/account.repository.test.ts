import { AccountRepository as rep } from '@/adapters/repository/account.repository';
import { PgTransactionT } from '@/types/config.type';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'bun:test';
import { buildMockAccount } from '../../../factory/account/mock';
import { DatabaseManager } from './../../../config/drizzle.plugin';
import { safeTestTransaction } from './../../../helper/transaction';

const client = DatabaseManager.getInstance().client;

describe('Account Repository', () => {
  describe('create', () => {
    it('create an account successfully', async () => {
      await safeTestTransaction(client, async (tx: PgTransactionT) => {
        const _mockAccount = buildMockAccount({});
        const actual = await rep.create(_mockAccount, tx);
        expect(actual).not.toBeNil();
      });
    });
  });
  describe('findByExternalId', () => {
    it('find account by externalId successfully', async () => {
      await safeTestTransaction(client, async (tx: PgTransactionT) => {
        const expected = { externalId: faker.string.alpha(16) };
        const _mockAccount = buildMockAccount({ externalId: expected.externalId });
        const actual = await rep.create(_mockAccount, tx).then(() => rep.findByExternalId(expected.externalId, tx));
        expect(actual).not.toBeUndefined();
        expect(actual?.externalId).toBe(expected.externalId);
      });
    });
  });
  describe('findById', () => {
    it('find account by id successfully', async () => {
      await safeTestTransaction(client, async (tx: PgTransactionT) => {
        const expected = { id: faker.string.uuid() };
        const _mockAccount = buildMockAccount({ id: expected.id });
        const actual = await rep.create(_mockAccount, tx).then(() => rep.findById(expected.id, tx));
        expect(actual).not.toBeUndefined();
        expect(actual?.id).toBe(expected.id);
      });
    });
  });
});
