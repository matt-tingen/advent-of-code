import { countBy, range, sum } from 'lodash';

const CYCLE_LENGTH = 7;
const CYCLE_DELAY = 2;
const CYCLE_RESET_VALUE = CYCLE_LENGTH - 1;
const CYCLE_INITIAL_VALUE = CYCLE_RESET_VALUE + CYCLE_DELAY;

export const simulateLanternfish = (
  initialTimers: number[],
  totalDays: number,
): number => {
  let timerCounts = countBy(initialTimers);

  for (let days = totalDays; days > 0; days--) {
    const newTimerCounts = Object.fromEntries(
      range(CYCLE_INITIAL_VALUE + 1).map((value) => [value, 0]),
    );

    for (let timer = 0; timer <= CYCLE_INITIAL_VALUE; timer++) {
      let newTimer = timer - 1;

      if (newTimer < 0) {
        newTimer = CYCLE_RESET_VALUE;
      }

      newTimerCounts[newTimer] += timerCounts[timer] ?? 0;
    }

    newTimerCounts[CYCLE_INITIAL_VALUE] = timerCounts[0] ?? 0;
    timerCounts = newTimerCounts;
  }

  return sum(Object.values(timerCounts));
};
