import Elysia from 'elysia';

export const certificationPlugin = new Elysia().derive(({ headers }) => {
  const token = headers['authentication']?.split(' ')[1];
  return {
    token: token ? token : null,
  };
});
