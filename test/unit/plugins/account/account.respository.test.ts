import { describe, expect, it } from 'bun:test';
import { buildMockAccount } from '../../../factory/mock';
import { AccountRepository } from '../../../../src/plugins/account/account.repository';
import { PgTransactionT } from '../../../../src/types/configTypes';
import { client } from '../../../config/drizzle.plugin';
import { safeTestTransaction } from '../../../helper/transaction';

describe('Account ', () => {
  it('create an account successfully', async () => {
    await safeTestTransaction(client, async (tx: PgTransactionT) => {
      const _mockAccount = buildMockAccount({});
      const actual = await AccountRepository.create(_mockAccount, tx).then((e) => AccountRepository.findById(e.id, tx));
      expect(actual).not.toBeNil();
    });
  });
  it('find an account by email', async () => {
    await safeTestTransaction(client, async (tx: PgTransactionT) => {
      const _mockAccount = buildMockAccount({ email: 'findAnAccountByEmail@example.com' });
      await AccountRepository.create(_mockAccount, tx);
      const actual = await AccountRepository.findByEmail(_mockAccount.email, tx);
      expect(actual).not.toBeNil();
      expect(actual.email).toEqual(_mockAccount.email);
    });
  });
  it('find an account by id', async () => {
    await safeTestTransaction(client, async (tx: PgTransactionT) => {
      const _mockAccount = buildMockAccount({});
      const _account = await AccountRepository.create(_mockAccount, tx);
      const actual = await AccountRepository.findById(_account.id, tx);
      expect(actual).not.toBeNil();
      expect(actual.id).toEqual(_account.id);
    });
  });
  it('finds accounts by role', async () => {
    await safeTestTransaction(client, async (tx: PgTransactionT) => {
      const _mockAccounts = [1, 2, 3].map((i) => {
        return i % 2 == 0 ? buildMockAccount({}) : buildMockAccount({ role: 'admin' });
      });
      const _fns = _mockAccounts.map((mock) => AccountRepository.create(mock, tx));
      const actual = await Promise.all([_fns]).then((_) => AccountRepository.findByRole('admin', tx));
      expect(actual).toBeArray();
      expect(actual).toHaveLength(2);
      actual.forEach((e) => expect(e).not.toEqual({ role: 'customer' }));
    });
  });
});
