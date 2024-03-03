import { t } from 'elysia';

const createBoardRequest = t.Object({
  title: t.String(),
});

const updateBoardRequest = t.Object({
  title: t.String(),
});
