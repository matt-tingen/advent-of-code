import { countBy, flow, sum } from 'lodash';
import { toInt } from '~/util/toInt';

const parse = (input: string) =>
  input.split('\n').map((line) => {
    const [hand, bid] = line.split(' ');

    return { cards: hand.split(''), bid: toInt(bid) };
  });

enum HandType {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

const cardValues = Object.fromEntries(
  ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'].map(
    (card, i) => [card, i],
  ),
);

const getHandType = (cards: string[]) => {
  const counts = Object.values(countBy(cards)).sort((a, b) => b - a);
  const [highestCount] = counts;

  switch (highestCount) {
    case 5:
      return HandType.FiveOfAKind;
    case 4:
      return HandType.FourOfAKind;
    case 3:
      return counts[1] === 2 ? HandType.FullHouse : HandType.ThreeOfAKind;
    case 2:
      return counts[1] === 2 ? HandType.TwoPair : HandType.OnePair;
    case 1:
    default:
      return HandType.HighCard;
  }
};

export const a = flow(parse, (hands) => {
  const handsWithType = hands
    .map((hand) => ({
      ...hand,
      type: getHandType(hand.cards),
    }))
    .sort((a, b) => {
      const typeDiff = a.type - b.type;
      if (typeDiff) return typeDiff;

      for (let i = 0; i < 5; i++) {
        const cardDiff = cardValues[a.cards[i]] - cardValues[b.cards[i]];
        if (cardDiff) return cardDiff;
      }

      return 0;
    });

  const winnings = handsWithType.map((hand, i) => hand.bid * (i + 1));

  return sum(winnings);
});
