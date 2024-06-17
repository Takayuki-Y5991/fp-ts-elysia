import { Elysia } from 'elysia';
import { accountRoutes } from './account.routes';
import { globalRoutes } from './global.routes';

export const routes = new Elysia().use(globalRoutes).use(accountRoutes);
