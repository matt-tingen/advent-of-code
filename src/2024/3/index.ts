import { sumBy } from 'lodash';
import { parseDecimalInt } from '~/util/parsers';
import { product } from '~/util/product';

const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;

export const a = (memory: string) => {
  const ops = Array.from(memory.matchAll(mulRegex));
  const factors = ops.map(([, ...groups]) => groups.map(parseDecimalInt));

  return sumBy(factors, product);
};
