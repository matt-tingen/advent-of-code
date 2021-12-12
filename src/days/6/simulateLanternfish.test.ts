import { simulateLanternfish } from './simulateLanternfish';

const testSim = createMacro(
  (timers: number[], days: number, expected: number) => {
    expect(simulateLanternfish(timers, days)).toEqual(expected);
  },
  (provided, timers, days, expected) =>
    `${provided || timers} grows over ${days} days to ${expected} fish`,
);

run(testSim, [3, 4, 3, 1, 2], 1, 5);
run(testSim, [3, 4, 3, 1, 2], 2, 6);
run(testSim, [3, 4, 3, 1, 2], 3, 7);
run(testSim, [3, 4, 3, 1, 2], 18, 26);
run(testSim, [3, 4, 3, 1, 2], 80, 5934);
run(testSim, [3, 4, 3, 1, 2], 256, 26984457539);
