import { flow, sortBy, sumBy, unzip, zip } from 'lodash';
import { parseDecimalInt, parseStringLines } from '~/util/parsers';

const parse = flow(parseStringLines, (lines) =>
  lines.map((line) => line.split('   ').map(parseDecimalInt)),
);

export const a = flow(parse, (ids: [number, number][]) => {
  const sorted = unzip(ids).map((list) => sortBy(list)) as [number[], number[]];
  const zipped = zip(...sorted) as [number, number][];

  return sumBy(zipped, ([l, r]) => Math.abs(l - r));
});
