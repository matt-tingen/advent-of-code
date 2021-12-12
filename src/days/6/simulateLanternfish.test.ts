import { simulateLanternfish } from './simulateLanternfish';

const testSim = createMacro(
  (timers: number[], days: number, expected: number[]) => {
    expect(simulateLanternfish(timers, days)).toEqual(expected);
  },
  (provided, timers, days, expected) =>
    `${provided || timers} grows over ${days} days to ${expected}`,
);

run(testSim, [3, 4, 3, 1, 2], 1, [2, 3, 2, 0, 1]);
run(testSim, [3, 4, 3, 1, 2], 2, [1, 2, 1, 6, 0, 8]);
run(testSim, [3, 4, 3, 1, 2], 3, [0, 1, 0, 5, 6, 7, 8]);
run(
  testSim,
  [3, 4, 3, 1, 2],
  18,
  [
    6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8,
    8,
  ],
);
