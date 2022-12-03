import { b } from './b';
import { parseDigitGrid } from './parse';

const testB = createMacro(
  (input: string, expected: number) => {
    expect(b(parseDigitGrid(input))).toBe(expected);
  },
  (provided, input, expected) =>
    `${provided || input} syncs on step ${expected}`,
);

run(
  'provided example',
  testB,
  `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`.trim(),
  195,
);
