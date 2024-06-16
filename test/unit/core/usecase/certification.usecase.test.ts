import { IGoogleClient } from '@/core/ports/client/google.client.port';
import { IAccountRepository } from '@/core/ports/repository/account.repository.port';
import { certification } from '@/core/usecase/certification.usecase';
import { faker } from '@faker-js/faker';
import admin from 'firebase-admin';

import { GoogleClient } from '@/adapters/client/google.client';
import { AccountRepository } from '@/adapters/repository/account.repository';
import { InvalidParameterError } from '@/types/error.type';
import { beforeEach, describe, expect, it, spyOn } from 'bun:test';
import { Effect as E } from 'effect';
import { InternalServerError } from 'elysia';
import { LoginTicketT, PgTransactionT } from '../../../../src/types/config.type';
import { buildMockAccount } from '../../../factory/account/mock';

describe('certification usecase', () => {
  let accountRepo: IAccountRepository;
  let googleClient: IGoogleClient;
  let tx: PgTransactionT;

  beforeEach(() => {
    accountRepo = AccountRepository as unknown as IAccountRepository;
    googleClient = GoogleClient(admin.auth());
  });

  it('Successful - register account', async () => {
    const uid = faker.string.alpha(16);
    const expected = { token: faker.string.alpha(100), payload: { uid }, account: buildMockAccount({ externalId: uid }) };

    spyOn(googleClient, 'verifyToken').mockImplementation(() => E.succeed(expected.payload as LoginTicketT));
    spyOn(accountRepo, 'findByExternalId').mockImplementation(async () => expected.account);

    const actual = await E.runPromise(certification(expected.token, { accountRepo, googleClient, tx }));
    expect(actual).toBe(expected.account);
    expect(actual).not.toBe('invalid payload');
  });
  it('Successful - still not register account', async () => {
    const uid = faker.string.alpha(16);
    const expected = { token: faker.string.alpha(100), payload: { uid }, account: null };

    spyOn(googleClient, 'verifyToken').mockImplementation(() => E.succeed(expected.payload as LoginTicketT));
    spyOn(accountRepo, 'findByExternalId').mockImplementation(async () => null);

    const actual = await E.runPromise(certification(expected.token, { accountRepo, googleClient, tx }));
    expect(actual).toBeNull();
    expect(actual).not.toBe('invalid payload');
  });
  it('Failure - token is invalid', async () => {
    const expected = new InvalidParameterError('invalid payload');
    spyOn(googleClient, 'verifyToken').mockImplementation(() => E.succeed({} as LoginTicketT));
    spyOn(accountRepo, 'findByExternalId').mockImplementation(async () => null);

    expect(async () => E.runPromise(certification(faker.string.alpha(16), { accountRepo, googleClient, tx }))).toThrow(expected);
  });
  it('Failure - failure token verify', async () => {
    const expected = new InvalidParameterError('invalid token');
    spyOn(googleClient, 'verifyToken').mockImplementation(() => E.fail(expected));
    spyOn(accountRepo, 'findByExternalId').mockImplementation(async () => null);
    expect(async () => E.runPromise(certification(faker.string.alpha(16), { accountRepo, googleClient, tx }))).toThrow(expected);
  });
  it('Failure - database connection error', async () => {
    const expected = new InternalServerError('failure connect database');
    spyOn(googleClient, 'verifyToken').mockImplementation(() => E.fail(expected));
    spyOn(accountRepo, 'findByExternalId').mockImplementation(async () => expected);
    expect(async () => E.runPromise(certification(faker.string.alpha(16), { accountRepo, googleClient, tx }))).toThrow(expected);
  });
});
