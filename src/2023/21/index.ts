import { flow } from 'lodash';
import { cardinalMoves, getCell } from '~/util/gridVector';
import { parseCharGrid } from '~/util/parsers';
import { vec, Vector } from '~/util/vector';

const parse = (input: string) => {
  const grid = parseCharGrid(input.replace('S', '.'));

  const width = grid[0].length + 1; // plus one for new lines
  const i = input.indexOf('S');
  const row = Math.floor(i / width);
  const col = i % width;

  const start = vec(col, row);

  return { grid, start };
};

export const a = flow(parse, ({ grid, start }) => {
  let positions = new Set([start.toString()]);

  for (let i = 0; i < 64; i++) {
    positions = new Set(
      [...positions].flatMap((posString) => {
        const pos = Vector.fromString(posString);

        return cardinalMoves
          .map((move) => pos.add(move))
          .filter((newPos) => getCell(grid, newPos) === '.')
          .map((newPos) => newPos.toString());
      }),
    );
  }

  return positions.size;
});
