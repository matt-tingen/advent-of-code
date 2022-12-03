import { sum } from 'lodash';
import { decodeEntry } from './decodeEntry';
import { DisplayEntry } from './parse';

export const b = (entries: DisplayEntry[]) =>
  sum(
    entries
      .map(decodeEntry)
      .map((digits) => parseInt(digits.map((d) => d.toString()).join(''), 10)),
  );
