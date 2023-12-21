import { flow, isEqual, range, sumBy } from 'lodash';
import { parseCharGrid } from '~/util/parsers';
import { transpose } from '~/util/transpose';

const parse = (input: string) => input.split('\n\n').map(parseCharGrid);

const isSmudged = (a: string[], b: string[]) => {
  let usedSmudge = false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      if (usedSmudge) return false;
      usedSmudge = true;
    }
  }

  return usedSmudge;
};

const findLineOfReflection = (lines: string[][], requireSmudge = false) => {
  for (let i = 0; i < lines.length - 1; i++) {
    const maxOffset = Math.min(i, lines.length - i - 2);
    let usedSmudge = false;

    if (
      range(maxOffset + 1).every((offset) => {
        const line = lines[i - offset];
        const nextLine = lines[i + offset + 1];

        if (isEqual(line, nextLine)) return true;

        if (requireSmudge && !usedSmudge) {
          usedSmudge = true;

          return isSmudged(line, nextLine);
        }
      }) &&
      (!requireSmudge || usedSmudge)
    ) {
      return i + 1;
    }
  }

  return null;
};

export const a = flow(parse, (grids) =>
  sumBy(grids, (grid) => {
    const y = findLineOfReflection(grid);

    return typeof y === 'number'
      ? 100 * y
      : findLineOfReflection(transpose(grid))!;
  }),
);

export const b = flow(parse, (grids) =>
  sumBy(grids, (grid) => {
    const y = findLineOfReflection(grid, true);

    return typeof y === 'number'
      ? 100 * y
      : findLineOfReflection(transpose(grid), true)!;
  }),
);
