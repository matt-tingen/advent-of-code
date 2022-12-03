import { b } from './b';

const testB = createMacro(
  (values: number[][], expected: number) => {
    expect(b(values)).toBe(expected);
  },
  (provided, input, expected) =>
    provided || `top 3 elves in ${JSON.stringify(input)} have ${expected}`,
);

run(
  testB,
  [[1000, 2000, 3000], [4000], [5000, 6000], [7000, 8000, 9000], [10000]],
  45000,
);
