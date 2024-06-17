import { certificationResponse } from '@/adapters/models/response/certification.response';
import Elysia from 'elysia';

export const accountModel = new Elysia().model({
  'certification.return': certificationResponse,
});
