import { b } from './b';

const testB = createMacro(
  (input: number[], expected: number) => {
    expect(b(input)).toBe(expected);
  },
  (provided, input, expected) =>
    `aligning ${provided || input} requires ${expected} fuel`,
);

run('provided example', testB, [16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 168);
run(testB, [1, 2, 3, 4], 5);
run(testB, [1, 1, 1, 1, 5], 10);
run(testB, [3, 60, 45, 10], 1173);
