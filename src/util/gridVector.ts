import { Grid } from './grid';
import { vec, Vector } from './vector';

export const north = vec(0, -1);
export const northEast = vec(1, -1);
export const east = vec(1, 0);
export const southEast = vec(1, 1);
export const south = vec(0, 1);
export const southWest = vec(-1, 1);
export const west = vec(-1, 0);
export const northWest = vec(-1, -1);
export const cardinalMoves = [north, east, south, west];
export const moves = [
  north,
  northEast,
  east,
  southEast,
  south,
  southWest,
  west,
  northWest,
];

export const getCell = <T>(grid: Grid<T>, vector: Vector) => {
  const { x, y } = vector;

  return grid[y]?.[x] as T | undefined;
};

export const setCell = <T>(grid: Grid<T>, vector: Vector, value: T) => {
  const { x, y } = vector;

  // eslint-disable-next-line no-param-reassign
  grid[y][x] = value;
};
