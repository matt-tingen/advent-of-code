import { countIncreases } from './a';

const test = createMacro(
  (values: number[], expected: number) => {
    expect(countIncreases(values)).toBe(expected);
  },
  (provided, input, expected) =>
    provided || `${input} has ${expected} increases`,
);

run(test, [0, 1, 2], 2);
run(test, [1, 1, 1], 0);
run(test, [3, 2, 1, 1, 2, 3], 2);
run(test, [199, 200, 208, 210, 200, 207, 240, 269, 260, 263], 7);
