import { Coords, Grid } from '~/util/grid';
import { stepDumbos } from './stepDumbos';

export const b = (initialGrid: Grid) => {
  let grid = initialGrid;
  const numOctopuses = grid.length * grid[0].length;
  let flashCoords: Coords[];
  let step = 0;

  do {
    [grid, flashCoords] = stepDumbos(grid);
    step++;
  } while (flashCoords.length !== numOctopuses);

  return step;
};
