import dedent from 'dedent';
import { a, b } from '.';

const providedInput = dedent`
  #.##..##.
  ..#.##.#.
  ##......#
  ##......#
  ..#.##.#.
  ..##..##.
  #.#.##.#.

  #...##..#
  #....#..#
  ..##..###
  #####.##.
  #####.##.
  ..##..###
  #....#..#
`;

it('solves provided a', () => {
  expect(a(providedInput)).toBe(405);
});

it('solves provided b', () => {
  expect(b(providedInput)).toBe(400);
});
