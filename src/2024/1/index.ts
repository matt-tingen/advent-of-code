import { countBy, flow, sortBy, sumBy, unzip, zip } from 'lodash';
import { parseDecimalInt, parseStringLines } from '~/util/parsers';

const parse = flow(
  parseStringLines,
  (lines) => lines.map((line) => line.split('   ').map(parseDecimalInt)),
  unzip,
);

export const a = flow(parse, (ids) => {
  const sorted = ids.map((list) => sortBy(list)) as [number[], number[]];
  const zipped = zip(...sorted) as [number, number][];

  return sumBy(zipped, ([l, r]) => Math.abs(l - r));
});

export const b = flow(parse, ([left, right]) => {
  const counts = countBy(right);

  return sumBy(left, (id) => id * (counts[id] ?? 0));
});
