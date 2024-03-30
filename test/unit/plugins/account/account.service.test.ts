import { describe, expect, it, mock } from 'bun:test';
import { buildCreatedMockAccount, buildMockAccount } from '../../../factory/account/mock';
import { IAccountRepository } from '../../../../src/plugins/account/account.repository';
import { safeTestTransaction } from '../../../helper/transaction';
import { DatabaseManager } from '../../../config/drizzle.plugin';
import { PgTransactionT } from '../../../../src/types/configTypes';
import {
  MAccountRepositoryCreateSuccess,
  MAccountRepositoryCreateFailureByEmailCheck,
  MAccountRepositoryCreateFailureByCantParsePassword,
  MAccountRepositoryCreateFailureByDatabase,
} from '../../../factory/account/repository';
import { AccountService } from '../../../../src/plugins/account/account.service';

const client = DatabaseManager.getInstance().client;

describe('Account Service', () => {
  describe('create fn', () => {
    it('create an account successfully', async () => {
      await safeTestTransaction(client, async (tx: PgTransactionT) => {
        const repository = MAccountRepositoryCreateSuccess({});
        const result = await AccountService.create(buildMockAccount({}), repository, tx);
        const actual = await result();
        expect(actual._tag).toBe('Right');
        expect(actual).toHaveProperty('right');
      });
    });
  });
  it('create an account failure by exited email', async () => {
    await safeTestTransaction(client, async (tx: PgTransactionT) => {
      const email = 'create_account_failure_by_exited_email@example.com';
      const repository = MAccountRepositoryCreateFailureByEmailCheck({
        account: buildCreatedMockAccount({ email: email }),
      });
      const result = await AccountService.create(buildMockAccount({}), repository, tx);
      const actual = await result();
      expect(actual._tag).toBe('Left');
      expect(actual).toHaveProperty('left', {
        message: `existed user : ${email}`,
        status: 'INVALID_ERROR',
      });
    });
  });
  it("create an account failure by can't parse password", async () => {
    await safeTestTransaction(client, async (tx: PgTransactionT) => {
      const repository = MAccountRepositoryCreateFailureByCantParsePassword;
      const result = await AccountService.create(buildMockAccount({ password: '' }), repository, tx);
      const actual = await result();
      expect(actual._tag).toBe('Left');
      expect(actual).toHaveProperty('left', {
        message: 'Password hashing failed.',
        status: 'INVALID_ERROR',
      });
    });
  });
  it("create an account failure by can't create account", async () => {
    await safeTestTransaction(client, async (tx: PgTransactionT) => {
      const repository = MAccountRepositoryCreateFailureByDatabase;
      const result = await AccountService.create(buildMockAccount({ password: '' }), repository, tx);
      const actual = await result();
      expect(actual._tag).toBe('Left');
      expect(actual).toHaveProperty('left', {
        message: 'Failed to create account.',
        status: 'DATABASE_ERROR',
      });
    });
  });
});
