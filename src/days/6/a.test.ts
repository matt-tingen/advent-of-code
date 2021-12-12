import { a } from './a';

const testA = createMacro(
  (timers: number[], expected: number) => {
    expect(a(timers)).toBe(expected);
  },
  (provided, input, expected) =>
    `${provided || input} has ${expected} fish at the end`,
);

run('provided example', testA, [3, 4, 3, 1, 2], 5934);
