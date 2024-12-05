import { sortBy, sum } from 'lodash';
import { parseDecimalInt } from '~/util/parsers';
import { product } from '~/util/product';

const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const doRegex = /do\(\)/g;
const dontRegex = /don't\(\)/g;

const calcMul = ([, ...groups]: RegExpExecArray) =>
  product(groups.map(parseDecimalInt));

export const a = (memory: string) => {
  const ops = Array.from(memory.matchAll(mulRegex));

  return sum(ops.map(calcMul));
};

export const b = (memory: string) => {
  const muls = memory.matchAll(mulRegex);
  const dos = memory.matchAll(doRegex);
  const donts = memory.matchAll(dontRegex);

  const ops = sortBy([...muls, ...dos, ...donts], (match) => match.index);

  return ops.reduce(
    (acc, op) => {
      if (op[0].startsWith('mul')) {
        if (acc.enabled) acc.sum += calcMul(op);
      } else {
        acc.enabled = !op[0].startsWith('don');
      }

      return acc;
    },
    { enabled: true, sum: 0 },
  ).sum;
};
