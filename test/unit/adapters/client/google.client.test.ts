import { GoogleClient } from '@/adapters/client/google.client';
import { IGoogleClient } from '@/core/ports/client/google.client.port';
import { LoginTicketT } from '@/types/config.type';
import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it, spyOn } from 'bun:test';
import { Effect as E } from 'effect';
import admin from 'firebase-admin';

describe('GoogleClient', () => {
  let googleClient: IGoogleClient;
  beforeEach(() => {
    googleClient = GoogleClient(admin.auth());
  });

  describe('verifyToken', () => {
    it('should return a loginTicket if the token is valid', async () => {
      const uid = faker.string.alpha(16);
      spyOn(googleClient, 'verifyToken').mockImplementation(() => {
        return E.succeed({ uid } as LoginTicketT);
      });
      const actual = await E.runPromise(googleClient.verifyToken('valid-token'));
      expect(actual).toContainKey('uid');
    });
    it('should return an error if the token is invalid', async () => {
      const expected = new Error('invalid token');
      spyOn(googleClient, 'verifyToken').mockImplementation(() => {
        return E.fail(expected);
      });
      expect(async () => await E.runPromise(googleClient.verifyToken('invalid-token'))).toThrow(expected);
    });
  });
});
