import { sortBy, sum } from 'lodash';

export const median = (values: number[]) => {
  const sorted = sortBy(values);
  const halfLength = sorted.length / 2;
  const indices = Number.isInteger(halfLength)
    ? [halfLength - 1, halfLength]
    : [halfLength - 0.5];

  return sum(indices.map((i) => sorted[i])) / indices.length;
};
