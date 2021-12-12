import { b } from './b';
import { parseVents } from './parse';

const testB = createMacro(
  (input: string, expected: number) => {
    expect(b(parseVents(input))).toBe(expected);
  },
  (provided, input, expected) =>
    `${provided || input} has ${expected} overlaps`,
);

run(
  'provided example',
  testB,
  `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`.trim(),
  12,
);
