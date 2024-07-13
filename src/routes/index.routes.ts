import { Elysia } from 'elysia';

import { certificationRoutes } from '@/routes/certification.routes';
import { globalRoutes } from '@/routes/global.routes';

export const routes = new Elysia().use(globalRoutes).use(certificationRoutes);
