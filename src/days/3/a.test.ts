import { a } from './a';

const testA = createMacro(
  (values: string[], expected: number) => {
    expect(a(values.map((value) => value.split('')))).toBe(expected);
  },
  (provided, input, expected) =>
    provided || `${input} indicates ${expected} power consumption`,
);

run(
  testA,
  // prettier-ignore
  [
    '00100',
    '11110',
    '10110'
  ],
  0b10110 * 0b01001,
);

run(
  testA,
  [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010',
  ],
  0b10110 * 0b01001,
);
