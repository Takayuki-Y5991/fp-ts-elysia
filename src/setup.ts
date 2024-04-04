import { Elysia, t } from 'elysia';
import { AccountRepository } from './plugins/account/account.repository';
import { AccountService } from './plugins/account/account.service';
import { error } from './types/model/error.model';
import { accountModel } from './plugins/account/account.model';
import { client } from './plugins/config/drizzie.plugin';
import { AuthService } from './plugins/auth/auth.service';
import { GoogleClient } from './plugins/auth/google.client';
import { OAuth2Client } from 'google-auth-library';

export const globalSetup = new Elysia({ name: 'setup' }).use(error).decorate({
  client: client,
});

export const accountSetUp = new Elysia()
  .use(accountModel)
  .decorate({
    accountRepository: AccountRepository,
    accountService: AccountService,
  })
  .onError(({ code, error }) => {
    if (code === 'VALIDATION') return { message: error.message };
    return isFoundError(error) ? { message: error.value.response } : { message: error.message };
  });

export const isFoundError = (error: any): error is { value: { response: any } } => {
  return 'value' in error && 'response' in error['value'];
};

export const authSetup = new Elysia()
  .use(accountModel)
  .decorate({
    accountRepository: AccountRepository,
    accountService: AccountService,
    authService: AuthService,
    googleClient: GoogleClient,
    // FIXME: add Options
    oauthClient: new OAuth2Client(),
  })
  .onError(({ error }) => {
    return isFoundError(error) ? { message: error.value.response } : { message: error.message };
  });
