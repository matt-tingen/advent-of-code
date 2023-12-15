import dedent from 'dedent';
import { a, b } from '.';

const square = dedent`
  .....
  .S-7.
  .|.|.
  .L-J.
  .....
`;

it('solves provided square loop for a', () => {
  expect(a(square)).toBe(4);
});

it('solves provided square loop for b', () => {
  expect(b(square)).toBe(1);
});

it('solves medium example for b', () => {
  const input = dedent`
    ...........
    .S-------7.
    .|F-----7|.
    .||.....||.
    .||.....||.
    .|L-7.F-J|.
    .|..|.|..|.
    .L--J.L--J.
    ...........
  `;

  expect(b(input)).toBe(4);
});

it('solves large sparse example for b', () => {
  const input = dedent`
    .F----7F7F7F7F-7....
    .|F--7||||||||FJ....
    .||.FJ||||||||L7....
    FJL7L7LJLJ||LJ.L-7..
    L--J.L7...LJS7F-7L7.
    ....F-J..F7FJ|L7L7L7
    ....L7.F7||L7|.L7L7|
    .....|FJLJ|FJ|F7|.LJ
    ....FJL-7.||.||||...
    ....L---J.LJ.LJLJ...
  `;

  expect(b(input)).toBe(8);
});

it('solves large dense example for b', () => {
  const input = dedent`
    FF7FSF7F7F7F7F7F---7
    L|LJ||||||||||||F--J
    FL-7LJLJ||||||LJL-77
    F--JF--7||LJLJ7F7FJ-
    L---JF-JLJ.||-FJLJJ7
    |F|F-JF---7F7-L7L|7|
    |FFJF7L7F-JF7|JL---7
    7-L-JL7||F7|L7F-7F7|
    L.L7LFJ|||||FJL7||LJ
    L7JLJL-JLJLJL--JLJ.L
  `;

  expect(b(input)).toBe(10);
});

it('flood fills for b', () => {
  const input = dedent`
    ...........
    .S-------7.
    .|.......|.
    .|.......|.
    .|.......|.
    .|.......|.
    .|.......|.
    .L-------J.
    ...........
  `;

  expect(b(input)).toBe(35);
});
