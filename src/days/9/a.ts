import { sumBy } from 'lodash';
import { findNadirs } from './findNadirs';
import { getCell } from './getCell';
import { Grid } from './types';

export const a = (grid: Grid) => {
  const nadirs = findNadirs(grid);

  return sumBy(nadirs, (coords) => getCell(grid, coords)! + 1);
};
