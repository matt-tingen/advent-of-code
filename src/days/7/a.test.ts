import { a } from './a';

const testA = createMacro(
  (input: number[], expected: number) => {
    expect(a(input)).toBe(expected);
  },
  (provided, input, expected) =>
    `aligning ${provided || input} requires ${expected} fuel`,
);

run('provided example', testA, [16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 37);
