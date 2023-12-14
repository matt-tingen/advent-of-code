import dedent from 'dedent';
import { a } from '.';

const input = dedent`
  0 3 6 9 12 15
  1 3 6 10 15 21
  10 13 16 21 30 45
`;

it('solves provided a', () => {
  expect(a(input)).toBe(114);
});
