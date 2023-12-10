import { flow, range, sumBy } from 'lodash';
import { toInt } from '~/util/toInt';
import { parseStringLines } from '../1/parse';

interface Card {
  winning: Set<number>;
  own: number[];
}

const parse = flow(parseStringLines, (rows) =>
  rows.map((row): Card => {
    const [winning, own] = row.replace(/.+:\s+/, '').split(/ \|\s+/);

    return {
      winning: new Set(winning.split(/\s+/).map(toInt)),
      own: own.split(/\s+/).map(toInt),
    };
  }),
);

const getCardMatchCount = (card: Card) =>
  card.own.filter((num) => card.winning.has(num)).length;

export const a = flow(parse, (cards) =>
  sumBy(cards, (card) => {
    const matches = getCardMatchCount(card);

    return matches && 2 ** (matches - 1);
  }),
);

export const b = flow(parse, (cards) => {
  const cardsWithIndex = cards.map((card, index) => ({ index, ...card }));

  let cardCount = 0;
  const pool = [...cardsWithIndex];

  while (pool.length) {
    cardCount++;
    const card = pool.pop()!;
    const matches = getCardMatchCount(card);

    pool.push(
      ...range(card.index + 1, card.index + 1 + matches).map(
        (i) => cardsWithIndex[i],
      ),
    );
  }

  return cardCount;
});
