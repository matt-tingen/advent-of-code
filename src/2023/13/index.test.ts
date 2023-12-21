import dedent from 'dedent';
import { a } from '.';

it('solves provided a', () => {
  const input = dedent`
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

  expect(a(input)).toBe(405);
});
