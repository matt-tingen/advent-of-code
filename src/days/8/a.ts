import { sumBy } from 'lodash';
import { decodeEntry } from './decodeEntry';
import { DisplayEntry } from './parse';

const digitsToCount = new Set([1, 4, 7, 8]);

export const a = (entries: DisplayEntry[]) => {
  const decodedOutputs = entries.map(decodeEntry);

  return sumBy(
    decodedOutputs,
    (digits) => digits.filter((d) => digitsToCount.has(d)).length,
  );
};
