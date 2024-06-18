import { GoogleClient } from '@/adapters/client/google.client';
import { accountModel } from '@/adapters/models/index.model';
import { AccountRepository } from '@/adapters/repository/account.repository';
import { client } from '@/plugins/config/drizzie.plugin';
import { error } from '@/types/model/error.model';
import { Elysia } from 'elysia';
import admin from 'firebase-admin';

/** Authenticate Setup */
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: Bun.env.GOOGLE_PROJECT_ID,
    privateKey: Bun.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    clientEmail: Bun.env.GOOGLE_CLIENT_EMAIL,
  }),
});

/** App Setup */
export const globalSetup = new Elysia({ name: 'setup' }).use(error).decorate({
  client: client,
});

export const accountSetUp = new Elysia()
  .use(accountModel)
  .decorate({
    accountRepo: AccountRepository,
    googleClient: GoogleClient(admin.auth()),
  })
  .onError(({ code, error }) => {
    if (code === 'VALIDATION') return { message: error.message };
    return isFoundError(error) ? { message: error.value.response } : { message: error.message };
  });
export const isFoundError = (error: any): error is { value: { response: any } } => {
  return 'value' in error && 'response' in error['value'];
};
