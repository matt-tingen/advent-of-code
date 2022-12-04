import { intersection, sumBy } from 'lodash';
import { Input, Rucksack } from './parse';

const aCode = 'a'.charCodeAt(0);
const ACode = 'A'.charCodeAt(0);

const getPriority = (item: string) => {
  const code = item.charCodeAt(0);

  return 1 + (code >= aCode ? code - aCode : code - ACode + 26);
};

export const a = (rucksacks: Input) =>
  sumBy(rucksacks, getMisplacedItemPriority);

const getMisplacedItemPriority = ([r1, r2]: Rucksack) => {
  const misplaced = intersection(r1.split(''), r2.split(''));

  return sumBy(misplaced, getPriority);
};
