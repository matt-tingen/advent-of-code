import { typedEntries } from '@matt-tingen/util';
import { flow, isEqual } from 'lodash';
import {
  cardinalMoves,
  Coords,
  east,
  getCell,
  north,
  setCell,
  south,
  west,
} from '~/util/grid';
import { parseCharGrid } from '~/util/parsers';

const parse = (input: string) => {
  const grid = parseCharGrid(input) as Tile[][];

  const width = grid[0].length + 1; // plus one for new lines
  const i = input.indexOf('S');
  const row = Math.floor(i / width);
  const col = i % width;

  const start: Coords = [row, col];

  return { grid, start };
};

type Pipe = keyof typeof pipeMoves;
type Tile = Pipe | '.' | 'S';

const pipeMoves = {
  '|': [north, south],
  '-': [east, west],
  L: [north, east],
  J: [north, west],
  '7': [south, west],
  F: [east, south],
};

const setStartPipe = ({ grid, start }: ReturnType<typeof parse>) => {
  const validMovesFromStart = cardinalMoves.filter((move) => {
    const neighbor = getCell(grid, move(start));
    const neighborMoves = neighbor ? pipeMoves[neighbor as Pipe] : undefined;

    return neighborMoves?.some((neighborMove) =>
      isEqual(start, neighborMove(move(start))),
    );
  });

  const startPipe = typedEntries(pipeMoves).find(([, moves]) =>
    isEqual(moves, validMovesFromStart),
  )![0];

  setCell(grid, start, startPipe);

  return {
    // Not strictly true, but valid as long as we only follow pipes from the start.
    grid: grid as Pipe[][],
    start,
  };
};

interface Path {
  current: Coords;
  prev: Coords;
}

export const a = flow(parse, setStartPipe, ({ grid, start }) => {
  const getMoves = (coords: Coords) => pipeMoves[getCell(grid, coords)!];
  const getNextMove = ({ current, prev }: Path) =>
    getMoves(current).filter((move) => !isEqual(move(current), prev))[0];
  const advancePath = (path: Path): Path => ({
    prev: path.current,
    current: getNextMove(path)(path.current),
  });

  const startMoves = getMoves(start);

  let steps = 1;
  let [a, b] = startMoves.map(
    (move): Path => ({ prev: start, current: move(start) }),
  );

  do {
    a = advancePath(a);
    b = advancePath(b);

    steps++;
  } while (!isEqual(a.current, b.current));

  return steps;
});
