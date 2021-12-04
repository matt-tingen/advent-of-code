import sum from './a';

const testSum = createMacro(
  (values: number[], expected: number) => {
    expect(sum(values)).toBe(expected);
  },
  (provided, input, expected) => provided || `${input} sums to ${expected}`,
);

run(testSum, [], 0);
run(testSum, [1, 1], 2);
