import { a } from './a';

const testA = createMacro(
  (values: number[][], expected: number) => {
    expect(a(values)).toBe(expected);
  },
  (provided, input, expected) =>
    provided ||
    `elf with most calories in ${JSON.stringify(input)} has ${expected}`,
);

run(
  testA,
  [[1000, 2000, 3000], [4000], [5000, 6000], [7000, 8000, 9000], [10000]],
  24000,
);
