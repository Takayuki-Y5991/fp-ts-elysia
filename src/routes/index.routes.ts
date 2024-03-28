import { Elysia } from 'elysia';
import { accountRoutes } from './account.routes';
import { globalRoutes } from './global.routes';
import { errorHandler } from '../setup';

export const routes = new Elysia().use(globalRoutes).use(accountRoutes).use(errorHandler);
