import { Immutable } from './Immutable';

export const map2d = <T, U>(
  values: Immutable<T[][]>,
  iteree: (value: Immutable<T>, row: number, col: number) => U,
): U[][] => values.map((row, r) => row.map((value, c) => iteree(value, r, c)));
