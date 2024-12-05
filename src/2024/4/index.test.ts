import dedent from 'dedent';
import { a, b } from '.';

const provided = dedent`
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

it('solves provided a', () => {
  expect(a(provided)).toBe(18);
});

it('solves provided b', () => {
  expect(b(provided)).toBe(9);
});
