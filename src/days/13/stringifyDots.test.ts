import { Dot } from './foldTransparency';
import { stringifyDots } from './stringifyDots';

const testStringify = createMacro(
  (dots: Dot[], expected: string) => {
    expect(stringifyDots(dots)).toBe(expected.trim());
  },
  (provided, dots) => `stringifies ${provided || dots}`,
);

run(
  'provided example step 0',
  testStringify,
  [
    { x: 6, y: 10 },
    { x: 0, y: 14 },
    { x: 9, y: 10 },
    { x: 0, y: 3 },
    { x: 10, y: 4 },
    { x: 4, y: 11 },
    { x: 6, y: 0 },
    { x: 6, y: 12 },
    { x: 4, y: 1 },
    { x: 0, y: 13 },
    { x: 10, y: 12 },
    { x: 3, y: 4 },
    { x: 3, y: 0 },
    { x: 8, y: 4 },
    { x: 1, y: 10 },
    { x: 2, y: 14 },
    { x: 8, y: 10 },
    { x: 9, y: 0 },
  ],
  `
...#..#..#.
....#......
...........
#..........
...#....#.#
...........
...........
...........
...........
...........
.#....#.##.
....#......
......#...#
#..........
#.#........
`,
);
