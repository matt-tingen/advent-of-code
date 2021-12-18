import { Immutable } from './Immutable';
import { map2d } from './map2d';

export const forEach2d = <T>(
  values: Immutable<T[][]>,
  iteree: (value: Immutable<T>, row: number, col: number) => void,
): void => {
  map2d(values, iteree);
};
