import dedent from 'dedent';
import { a } from '.';

const input = dedent`
  32T3K 765
  T55J5 684
  KK677 28
  KTJJT 220
  QQQJA 483
`;

it('solves provided a', () => {
  expect(a(input)).toBe(6440);
});
