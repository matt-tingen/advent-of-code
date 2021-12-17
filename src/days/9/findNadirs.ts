import { getCell } from './getCell';
import { east, north, south, west } from './move';
import { Coords, Grid } from './types';

const isNadir = (grid: Grid, coords: Coords) => {
  const get = (coords: Coords) => getCell(grid, coords) ?? Infinity;

  const value = get(coords);

  return (
    value < get(north(coords)) &&
    value < get(east(coords)) &&
    value < get(south(coords)) &&
    value < get(west(coords))
  );
};

export const findNadirs = (grid: Grid) => {
  const nadirs: Coords[] = [];

  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];

    for (let c = 0; c < row.length; c++) {
      const coords: Coords = [r, c];

      if (isNadir(grid, coords)) {
        nadirs.push(coords);
      }
    }
  }

  return nadirs;
};
