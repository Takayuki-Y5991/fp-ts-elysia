import { Elysia, Static, t } from 'elysia';
import { Priority } from '../types/unionType';

const priority = t.Union([
  t.Literal(Priority.LOW),
  t.Literal(Priority.HIGH),
  t.Literal(Priority.MEDIUM),
]);

const task = t.Object({
  id: t.String({
    format: 'uuid',
  }),
  title: t.String(),
  description: t.String(),
  priority: priority,
  storyId: t.String({
    format: 'uuid',
  }),
});

export type Task = Static<typeof task>;

const createTask = t.Object({
  title: t.String(),
  description: t.String(),
  priority: priority,
  storyId: t.String({
    format: 'uuid',
  }),
});

export type CreateTask = Static<typeof createTask>;

const app = new Elysia();
export const taskModel = app.model({
  'task.task': task,
  'task.tasks': t.Array(task),
  'task.create': createTask,
});
