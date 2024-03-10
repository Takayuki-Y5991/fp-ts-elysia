import { Elysia, t } from 'elysia';
import prisma from './plugins/config/prisma.plugin';
import { AccountRepository } from './plugins/account/account.repository';
import { AccountService } from './plugins/account/account.service';
import { error } from './types/model/error.model';
import { accountModel } from './plugins/account/account.model';

export const globalSetup = new Elysia({ name: 'setup' }).use(error).decorate({
  prisma: prisma,
});

export const accountSetUp = new Elysia().use(accountModel).decorate({
  accountRepository: AccountRepository,
  accountService: AccountService,
});

export const errorHandler = new Elysia().onError(({ error }) => {
  function isFoundError(error: any): error is { value: { response: any } } {
    return 'value' in error && 'response' in error['value'];
  }
  return isFoundError(error) ? { message: error.value.response } : { message: error.message };
});
