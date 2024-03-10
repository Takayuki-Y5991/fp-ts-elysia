import { pino } from '@bogeychan/elysia-logger';

export const logger = pino({
  transport: {
    target: 'pino/file',
    options: {
      destination: `.logs/${new Date().getDate().toString()}.log`,
      mkdir: true,
      touch: true,
    },
  },
});
