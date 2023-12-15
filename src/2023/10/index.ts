import { typedEntries } from '@matt-tingen/util';
import { flow, maxBy } from 'lodash';
import {
  cardinalMoves,
  east,
  getCell,
  north,
  setCell,
  south,
  west,
} from '~/util/gridVector';
import { parseCharGrid } from '~/util/parsers';
import { vec, Vector, VectorString } from '~/util/vector';

const parse = (input: string) => {
  const grid = parseCharGrid(input) as Tile[][];

  const width = grid[0].length + 1; // plus one for new lines
  const i = input.indexOf('S');
  const row = Math.floor(i / width);
  const col = i % width;

  const start = vec(col, row);

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
    const neighbor = getCell(grid, start.add(move));
    const neighborMoves = neighbor ? pipeMoves[neighbor as Pipe] : undefined;

    const inverseMove = move.negate();

    return neighborMoves?.some((neighborMove) =>
      inverseMove.equals(neighborMove),
    );
  });

  const startPipe = typedEntries(pipeMoves).find(([, moves]) =>
    moves.every((move, i) => move.equals(validMovesFromStart[i])),
  )![0];

  setCell(grid, start, startPipe);

  return {
    // Not strictly true, but valid as long as we only follow pipes from the start.
    grid: grid as Pipe[][],
    start,
  };
};

interface Tracer {
  current: Vector;
  prev: Vector;
}

const getMoves = (grid: Pipe[][], pos: Vector) =>
  pipeMoves[getCell(grid, pos)!];

const getNextMove = (grid: Pipe[][], tracer: Tracer) => {
  const inversePriorMove = tracer.prev.subtract(tracer.current);

  return getMoves(grid, tracer.current).filter(
    (move) => !move.equals(inversePriorMove),
  )[0];
};

const advanceTracer = (tracer: Tracer, move: Vector): Tracer => ({
  prev: tracer.current,
  current: tracer.current.add(move),
});

const findAllPipeCells = (grid: Pipe[][], start: Vector) => {
  const startMoves = getMoves(grid, start);
  let tracer: Tracer = { prev: start, current: start.add(startMoves[0]) };
  const pipeline = [start];

  do {
    pipeline.push(tracer.current);
    tracer = advanceTracer(tracer, getNextMove(grid, tracer));
  } while (!tracer.current.equals(start));

  return pipeline;
};

export const a = flow(
  parse,
  setStartPipe,
  ({ grid, start }) => findAllPipeCells(grid, start).length / 2,
);

export const b = flow(parse, setStartPipe, ({ grid, start }) => {
  const pipeline = findAllPipeCells(grid, start);
  const easternMostCoords = maxBy(pipeline, (coords) => coords.x)!;
  // If north is a valid move from here, travel in that direction along the
  // pipeline tagging all cells to the left. Otherwise, travel south tagging on
  // the right. These tagged cells will be either on the pipeline or enclosed by
  // the pipeline.
  const moves = getMoves(grid, easternMostCoords);
  const hasNorthMove = moves.some((move) => move.equals(north));
  const firstMove = hasNorthMove ? north : south;
  const interiorAngle = firstMove.angleTo(west);

  let tracer: Tracer = {
    prev: easternMostCoords,
    current: easternMostCoords.add(firstMove),
  };

  const pipelineStrings = new Set(pipeline.map((p) => p.toString()));
  const enclosedCellStrings = new Set<VectorString>();

  const checkEnclosed = (enclosedOrPipe: Vector) => {
    const str = enclosedOrPipe.toString();

    if (!pipelineStrings.has(str)) {
      enclosedCellStrings.add(str);
    }
  };

  const tagCells = (completedMove: Vector, postMoveTracer: Tracer) => {
    const tagMove = completedMove.rotate(interiorAngle).rounded();

    checkEnclosed(postMoveTracer.current.add(tagMove));
    checkEnclosed(postMoveTracer.prev.add(tagMove));
  };

  tagCells(firstMove, tracer);

  while (!tracer.current.equals(easternMostCoords)) {
    const move = getNextMove(grid, tracer);

    tracer = advanceTracer(tracer, move);
    tagCells(move, tracer);
  }

  // Flood fill the enclosed cells which are not adjacent to a pipe.
  const floodFillQueue = [...enclosedCellStrings]
    .flatMap((str) =>
      cardinalMoves.map((move) => Vector.fromString(str).add(move)),
    )
    .filter((pos) => !pipelineStrings.has(pos.toString()));

  while (floodFillQueue.length > 0) {
    const pos = floodFillQueue.shift()!;
    const str = pos.toString();

    if (!enclosedCellStrings.has(str)) {
      floodFillQueue.push(...cardinalMoves.map((move) => pos.add(move)));
      enclosedCellStrings.add(str);
    }
  }

  return enclosedCellStrings.size;
});
