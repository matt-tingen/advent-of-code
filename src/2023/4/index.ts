import { flow, sumBy } from 'lodash';
import { toInt } from '~/util/toInt';
import { parseStringLines } from '../1/parse';

const parse = flow(parseStringLines, (rows) =>
  rows.map((row) => {
    const [winning, own] = row.replace(/.+:\s+/, '').split(/ \|\s+/);

    return {
      winning: new Set(winning.split(/\s+/).map(toInt)),
      own: own.split(/\s+/).map(toInt),
    };
  }),
);

export const a = flow(parse, (cards) =>
  sumBy(cards, (card) => {
    const matches = card.own.filter((num) => card.winning.has(num)).length;

    return matches && 2 ** (matches - 1);
  }),
);
