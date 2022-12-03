import { b } from './b';

const testB = createMacro(
  (values: number[], expected: number) => {
    expect(b(values)).toBe(expected);
  },
  (provided, input, expected) =>
    provided || `${input} has ${expected} increases`,
);

run(testB, [0, 1, 2], 0);
run(testB, [1, 1, 1], 0);
run(testB, [3, 2, 1, 1, 2, 3], 2);
run(testB, [199, 200, 208, 210, 200, 207, 240, 269, 260, 263], 5);
