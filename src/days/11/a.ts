import { Coords, Grid } from '../../util/grid';
import { stepDumbos } from './stepDumbos';

export const a = (initialGrid: Grid) => {
  let grid = initialGrid;
  let flashCoords: Coords[];
  let flashCount = 0;

  for (let i = 0; i < 100; i++) {
    [grid, flashCoords] = stepDumbos(grid);
    flashCount += flashCoords.length;
  }

  return flashCount;
};
