import { b } from './b';
import { parseDigitGrid } from './parse';

const testB = createMacro(
  (input: string, expected: number) => {
    expect(b(parseDigitGrid(input))).toBe(expected);
  },
  (provided, input, expected) =>
    `${provided || input} has basin product ${expected}`,
);

run(
  'provided example',
  testB,
  `
2199943210
3987894921
9856789892
8767896789
9899965678
`.trim(),
  1134,
);
