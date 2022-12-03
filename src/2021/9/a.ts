import { sumBy } from 'lodash';
import { getCell, Grid } from '../../util/grid';
import { findNadirs } from './findNadirs';

export const a = (grid: Grid) => {
  const nadirs = findNadirs(grid);

  return sumBy(nadirs, (coords) => getCell(grid, coords)! + 1);
};
