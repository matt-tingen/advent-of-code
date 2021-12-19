export type Grid<T = number> = T[][];
export type Coords = [row: number, col: number];

type Move = (coords: Coords) => Coords;

const makeMove =
  (deltaR: number, deltaC: number): Move =>
  ([r, c]) =>
    [r + deltaR, c + deltaC];

export const north = makeMove(-1, 0);
export const northEast = makeMove(-1, 1);
export const east = makeMove(0, 1);
export const southEast = makeMove(1, 1);
export const south = makeMove(1, 0);
export const southWest = makeMove(1, -1);
export const west = makeMove(0, -1);
export const northWest = makeMove(-1, -1);
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

export const getCell = <T>(grid: Grid<T>, coords: Coords) => {
  const [r, c] = coords;

  return grid[r]?.[c] as T | undefined;
};

export const setCell = <T>(grid: Grid<T>, coords: Coords, value: T) => {
  const [r, c] = coords;

  // eslint-disable-next-line no-param-reassign
  grid[r][c] = value;
};

export const toDigitGridString = (grid: Grid<number>) => {
  if (
    grid
      .flat()
      .some((value) => !Number.isInteger(value) || value < 0 || value > 9)
  )
    throw new Error('Found non-digit');

  return grid.map((row) => row.join('')).join('\n');
};
