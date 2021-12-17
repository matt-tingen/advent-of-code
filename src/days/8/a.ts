import { sum } from 'lodash';
import { countDigits } from './countDigits';
import { DisplayEntry } from './parse';

export const a = (entries: DisplayEntry[]) => {
  const counts = countDigits(entries);

  return sum([1, 4, 7, 8].map((i) => counts[i]));
};
