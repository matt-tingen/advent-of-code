import { a } from './a';
import { parseDigitGrid } from './parse';

const testA = createMacro(
  (input: string, expected: number) => {
    expect(a(parseDigitGrid(input))).toBe(expected);
  },
  (provided, input, expected) =>
    `${provided || input} has total risk ${expected}`,
);

run(
  'provided example',
  testA,
  `
2199943210
3987894921
9856789892
8767896789
9899965678
`.trim(),
  15,
);
