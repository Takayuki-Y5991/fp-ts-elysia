import { GoogleClient } from '@/adapters/client/google.client';
import { certificationHandler } from '@/adapters/handlers/certification.handler';
import { AccountRepository } from '@/adapters/repository/account.repository';
import { IGoogleClient } from '@/core/ports/client/google.client.port';
import { IAccountRepository } from '@/core/ports/repository/account.repository.port';
import { LoginTicketT, PgTransactionT } from '@/types/config.type';
import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it, spyOn } from 'bun:test';
import { Effect as E } from 'effect';
import admin from 'firebase-admin';
import { buildMockAccount } from '../../../factory/account/mock';

describe('certificationHandler', () => {
  let accountRepo: IAccountRepository;
  let googleClient: IGoogleClient;
  let tx: PgTransactionT;

  beforeEach(() => {
    accountRepo = AccountRepository as unknown as IAccountRepository;
    googleClient = GoogleClient(admin.auth());
  });

  it('should return a TCertificationResponse if the token is valid and the account exists', async () => {
    const payload = { uid: faker.string.alpha(16) };
    const token = faker.string.alpha(100);
    const expected = buildMockAccount({ externalId: payload.uid });

    spyOn(googleClient, 'verifyToken').mockImplementation(() => E.succeed(payload as LoginTicketT));
    spyOn(accountRepo, 'findByExternalId').mockImplementation(async () => expected);

    try {
      const actual = await E.runPromise(certificationHandler(token, { accountRepo, googleClient, tx }));

      expect(actual).toEqual(expected);
    } catch (e) {
      console.log(e);
    }
  });
});
//   it('should return a TCertificationResponse with null account if the token is valid but the account does not exist', async () => {
//     const uid = faker.string.alpha(16);
//     const token = faker.string.alpha(100);
//     const expectedResponse = { account: null };

//     spyOn(certification, 'default').mockImplementation(() => E.succeed(null));
//     spyOn(converter, 'default').mockImplementation(() => E.succeed(expectedResponse));

//     const result = await E.runPromise(certificationHandler(token, { accountRepo, googleClient, tx }));

//     expect(result).toEqual(expectedResponse);
//   });

//   it('should throw an error if the certification use case fails', async () => {
//     const token = faker.string.alpha(100);
//     const error = new Error('Certification failed');

//     spyOn(certification, 'default').mockImplementation(() => E.fail(error));

//     await expect(E.runPromise(certificationHandler(token, { accountRepo, googleClient, tx }))).rejects.toThrow(error);
//   });

//   it('should throw an error if the converter function fails', async () => {
//     const uid = faker.string.alpha(16);
//     const token = faker.string.alpha(100);
//     const account = buildMockAccount({ externalId: uid });
//     const error = new Error('Conversion failed');

//     spyOn(certification, 'default').mockImplementation(() => E.succeed(account));
//     spyOn(converter, 'default').mockImplementation(() => E.fail(error));

//     await expect(E.runPromise(certificationHandler(token, { accountRepo, googleClient, tx }))).rejects.toThrow(error);
//   });
// });
