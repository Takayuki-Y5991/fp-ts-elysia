import { Optional } from '@/types/globalTypes';

export const head = <T>(array: Array<T>) => array[0];
export const mapForRow = <T, R>(rows: Optional<T | T[]>, convertFn: (row: T) => R): Optional<R | R[]> => {
  if (Array.isArray(rows)) return rows.filter((row: T) => row !== null).map((row: T) => (row ? convertFn(row) : null)) as R[];
  if (rows) return convertFn(rows);
  return null;
};
