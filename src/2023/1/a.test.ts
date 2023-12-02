import { a } from './a';

const testA = createMacro(
  (lines: string[], expected: number) => {
    expect(a(lines)).toBe(expected);
  },
  (provided, input, expected) =>
    provided || `sum of calibration values is ${expected}`,
);

run(testA, ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'], 142);
