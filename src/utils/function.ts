import { Optional } from '@/types/utility.types';

export const head = <T>(array: Array<T>) => array[0];

export const ifPresent = <T>(optional: Optional<T>): boolean => optional !== null;
