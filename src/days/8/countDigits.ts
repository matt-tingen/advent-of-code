import { groupBy, partition, range, sumBy } from 'lodash';
import { DisplayEntry } from './parse';

const digits = range(10);

/** The segments which must be lit to represent each number. */
const segments: Record<number, string> = {
  0: 'abcefg',
  1: 'cf',
  2: 'acdeg',
  3: 'acdfg',
  4: 'bcdf',
  5: 'abdfg',
  6: 'abdefg',
  7: 'acf',
  8: 'abcdefg',
  9: 'abcdf',
};

const segmentCounts = groupBy(
  Object.values(segments),
  (digitSegments) => digitSegments.length,
);

export const countDigits = (entries: DisplayEntry[]) => {
  const digitCounts = {} as Record<number, number>;

  const [unambiguousDigits] = partition(
    digits,
    (i) => segmentCounts[segments[i].length].length === 1,
  );

  unambiguousDigits.forEach((i) => {
    digitCounts[i] = sumBy(
      entries,
      (entry) =>
        entry.output.filter((digit) => digit.length === segments[i].length)
          .length,
    );
  });

  return digitCounts;
};
