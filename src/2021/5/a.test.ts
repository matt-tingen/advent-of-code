import { a } from './a';
import { parseVents } from './parse';

const testA = createMacro(
  (input: string, expected: number) => {
    expect(a(parseVents(input))).toBe(expected);
  },
  (provided, input, expected) =>
    `${provided || input} has ${expected} overlaps`,
);

run(
  'provided example',
  testA,
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
  5,
);
