import { sortBy } from 'lodash';
import { product } from '../../util/product';
import { findBasin } from './findBasin';
import { findNadirs } from './findNadirs';
import { Grid } from './types';

export const b = (grid: Grid) => {
  const nadirs = findNadirs(grid);
  const basins = nadirs.map((nadir) => findBasin(grid, nadir));
  const basinSizes = sortBy(
    basins.map((basin) => basin.length),
    (size) => -size,
  );

  return product(basinSizes.slice(0, 3));
};
