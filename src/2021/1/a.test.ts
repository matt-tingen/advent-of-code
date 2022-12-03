import { a } from './a';

const testA = createMacro(
  (values: number[], expected: number) => {
    expect(a(values)).toBe(expected);
  },
  (provided, input, expected) =>
    provided || `${input} has ${expected} increases`,
);

run(testA, [0, 1, 2], 2);
run(testA, [1, 1, 1], 0);
run(testA, [3, 2, 1, 1, 2, 3], 2);
run(testA, [199, 200, 208, 210, 200, 207, 240, 269, 260, 263], 7);
