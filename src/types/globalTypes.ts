export type ElysiaAppResponse<T = unknown> = {
  code: number;
  data: T;
};

type Result = 'Left' | 'Right';

export type ResponseType = {
  _tag: Result;
  left?: any;
  right?: any;
};

export type Optional<T> = T | null;
