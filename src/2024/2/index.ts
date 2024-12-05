import { flow } from 'lodash';
import { parseIntGrid } from '~/util/parsers';

const parse = parseIntGrid;

const isSafe = (level: number[]) => {
  const sign = Math.sign(level[1] - level[0]);

  return level.every((value, i) => {
    if (i === 0) return true;

    const prev = level[i - 1];
    const diff = value - prev;

    return (
      Math.sign(diff) === sign && Math.abs(diff) >= 1 && Math.abs(diff) <= 3
    );
  });
};

export const a = flow(parse, (levels) => levels.filter(isSafe).length);
