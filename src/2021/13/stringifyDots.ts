import { maxBy, range } from 'lodash';
import { Dot } from './foldTransparency';

const DOT = '#';
const EMPTY = '.';

export const stringifyDots = (dots: Dot[]) => {
  const maxX = maxBy(dots, 'x')!.x;
  const maxY = maxBy(dots, 'y')!.y;
  const grid = range(maxY + 1).map(() => Array(maxX + 1).fill(EMPTY));

  dots.forEach(({ x, y }) => {
    grid[y][x] = DOT;
  });

  return grid.map((row) => row.join('')).join('\n');
};
