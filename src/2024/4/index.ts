import { flow, sumBy } from 'lodash';
import { Grid } from '~/util/grid';
import {
  getAllCoordinates,
  getCell,
  moves,
  northEast,
  northWest,
  southEast,
  southWest,
} from '~/util/gridVector';
import { parseCharGrid } from '~/util/parsers';
import { Vector } from '~/util/vector';

const parse = parseCharGrid;

const word = 'XMAS'.split('');

const matchesWord = (grid: Grid<string>, start: Vector, direction: Vector) =>
  word.every(
    (char, i) => char === getCell(grid, start.add(direction.scale(i))),
  );

const countWords = (grid: Grid<string>, start: Vector) =>
  moves.filter((move) => matchesWord(grid, start, move)).length;

export const a = flow(parse, (grid) => {
  const starts = getAllCoordinates(grid);

  return sumBy(starts, (start) => countWords(grid, start));
});

const areSmPair = (
  grid: Grid<string>,
  center: Vector,
  dirA: Vector,
  dirB: Vector,
) => {
  const a = getCell(grid, center.add(dirA));
  const b = getCell(grid, center.add(dirB));

  return (a === 'S' && b === 'M') || (a === 'M' && b === 'S');
};

export const b = flow(parse, (grid) => {
  const centers = getAllCoordinates(grid);

  return centers.filter(
    (center) =>
      getCell(grid, center) === 'A' &&
      areSmPair(grid, center, northWest, southEast) &&
      areSmPair(grid, center, northEast, southWest),
  ).length;
});
