import { flow, range, sumBy } from 'lodash';
import { Grid } from '~/util/grid';
import { getCell, moves } from '~/util/gridVector';
import { parseCharGrid } from '~/util/parsers';
import { vec, Vector } from '~/util/vector';

const parse = parseCharGrid;

const word = 'XMAS'.split('');

const matchesWord = (grid: Grid<string>, start: Vector, direction: Vector) =>
  word.every(
    (char, i) => char === getCell(grid, start.add(direction.scale(i))),
  );

const countWords = (grid: Grid<string>, start: Vector) =>
  moves.filter((move) => matchesWord(grid, start, move)).length;

export const a = flow(parse, (grid) => {
  const starts = range(grid.length).flatMap((row) =>
    range(grid[0].length).map((col) => vec(col, row)),
  );

  return sumBy(starts, (start) => countWords(grid, start));
});
