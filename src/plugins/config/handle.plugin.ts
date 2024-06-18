import { Elysia, error as ElysiaError } from 'elysia';

export const errorHandle = new Elysia().onError(({ code, error }) => {
  if (code === 'VALIDATION') return ElysiaError('Bad Request', { message: error.message });
  return isFoundError(error) ? { message: error.value.response } : { message: error.message };
});
const isFoundError = (error: any): error is { value: { response: any } } => {
  return 'value' in error && 'response' in error['value'];
};
