import { getCell } from './getCell';
import { Coords, Grid } from './types';

const isNadir = (grid: Grid, coords: Coords) => {
  const get = (coords: Coords) => getCell(grid, coords) ?? Infinity;

  const value = get(coords);
  const [r, c] = coords;

  return (
    value < get([r - 1, c]) &&
    value < get([r + 1, c]) &&
    value < get([r, c - 1]) &&
    value < get([r, c + 1])
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
