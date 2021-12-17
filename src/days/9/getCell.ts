import { Coords, Grid } from './types';

export const getCell = (grid: Grid, coords: Coords) => {
  const [r, c] = coords;

  return grid[r]?.[c] as number | undefined;
};
