import { cardinalMoves, Coords, getCell, Grid } from '~/util/grid';

export const findBasin = (grid: Grid, nadir: Coords) => {
  const basin: Coords[] = [];

  walk(grid, nadir, -Infinity, new Set(), basin);

  return basin;
};

const getCoordsHash = (grid: Grid, coords: Coords) => {
  const [r, c] = coords;

  return r * grid[0].length + c;
};

const walk = (
  grid: Grid,
  current: Coords,
  prevValue: number,
  visited: Set<number>,
  basin: Coords[],
): void => {
  const i = getCoordsHash(grid, current);

  if (visited.has(i)) return;

  const value = getCell(grid, current);
  if (value === undefined || value < prevValue || value === 9) return;

  visited.add(i);
  basin.push(current);

  cardinalMoves.forEach((move) => {
    walk(grid, move(current), value, visited, basin);
  });
};
