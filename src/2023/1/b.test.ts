import { b } from './b';

const testB = createMacro(
  (lines: string[], expected: number) => {
    expect(b(lines)).toBe(expected);
  },
  (provided, input, expected) =>
    provided || `sum of calibration values is ${expected}`,
);

run(
  testB,
  [
    'two1nine',
    'eightwothree',
    'abcone2threexyz',
    'xtwone3four',
    '4nineeightseven2',
    'zoneight234',
    '7pqrstsixteen',
  ],
  281,
);
run('overlapping text digits', testB, ['zoneightasdf', '2oneeight'], 18 + 28);
