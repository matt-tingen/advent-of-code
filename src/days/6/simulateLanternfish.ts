const CYCLE_LENGTH = 7;
const CYCLE_DELAY = 2;
const CYCLE_RESET_VALUE = CYCLE_LENGTH - 1;
const CYCLE_INITIAL_VALUE = CYCLE_RESET_VALUE + CYCLE_DELAY;

export const simulateLanternfish = (
  timers: number[],
  days: number,
): number[] => {
  if (days === 0) return timers;

  let newFish = 0;
  const newTimers = timers.map((timer) => {
    let newTimer = timer - 1;

    if (newTimer < 0) {
      newTimer = CYCLE_RESET_VALUE;
      newFish++;
    }

    return newTimer;
  });

  newTimers.push(...Array<number>(newFish).fill(CYCLE_INITIAL_VALUE));

  return simulateLanternfish(newTimers, days - 1);
};
