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

const baseCardValues = Object.fromEntries(
  ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'].map(
    (card, i) => [card, i],
  ),
);

const jokerCardValues = {
  ...baseCardValues,
  J: -1,
} as typeof baseCardValues;

const getHandType = (cards: string[], useJokers = false) => {
  const cardCounts = countBy(cards);
  const counts = Object.values({
    ...cardCounts,
    ...(useJokers && { J: 0 }),
  }).sort((a, b) => b - a);
  const [highestCount] = counts;

  const type = (() => {
    switch (highestCount + (useJokers ? cardCounts.J ?? 0 : 0)) {
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
  })();

  return type;
};

interface HandWithType {
  bid: number;
  cards: string[];
  type: HandType;
}

const createHandComparator =
  (cardValues: Record<string, number>) =>
  (a: HandWithType, b: HandWithType) => {
    const typeDiff = a.type - b.type;
    if (typeDiff) return typeDiff;

    for (let i = 0; i < 5; i++) {
      const cardDiff = cardValues[a.cards[i]] - cardValues[b.cards[i]];
      if (cardDiff) return cardDiff;
    }

    return 0;
  };

export const a = flow(parse, (hands) => {
  const handsWithType = hands
    .map((hand) => ({
      ...hand,
      type: getHandType(hand.cards),
    }))
    .sort(createHandComparator(baseCardValues));

  const winnings = handsWithType.map((hand, i) => hand.bid * (i + 1));

  return sum(winnings);
});

export const b = flow(parse, (hands) => {
  const handsWithType = hands
    .map((hand) => ({
      ...hand,
      type: getHandType(hand.cards, true),
    }))
    .sort(createHandComparator(jokerCardValues));

  const winnings = handsWithType.map((hand, i) => hand.bid * (i + 1));

  return sum(winnings);
});
