import { flow, range, sumBy } from 'lodash';
import { transpose } from '~/util/transpose';

const parse = (input: string) =>
  input.split('\n\n').map((grid) => grid.split('\n'));

const findLineOfReflection = (lines: string[]) => {
  for (let i = 0; i < lines.length - 1; i++) {
    const maxOffset = Math.min(i, lines.length - i - 2);

    if (
      range(maxOffset + 1).every((offset) => {
        const line = lines[i - offset];
        const nextLine = lines[i + offset + 1];

        return line === nextLine;
      })
    ) {
      return i + 1;
    }
  }

  return null;
};

const transposeLines = (lines: string[]) =>
  transpose(lines.map((line) => line.split(''))).map((line) => line.join(''));

export const a = flow(parse, (grids) =>
  sumBy(grids, (grid) => {
    const y = findLineOfReflection(grid);

    return typeof y === 'number'
      ? 100 * y
      : findLineOfReflection(transposeLines(grid))!;
  }),
);
