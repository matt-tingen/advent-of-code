import dedent from 'dedent';
import { a } from '.';

it('solves provided square loop', () => {
  const input = dedent`
    .....
    .S-7.
    .|.|.
    .L-J.
    .....
  `;

  expect(a(input)).toBe(4);
});
