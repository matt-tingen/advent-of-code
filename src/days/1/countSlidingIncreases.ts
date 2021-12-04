export const countSlidingIncreases = (values: number[], windowSize: number) => {
  let increaseCount = 0;

  for (let i = 1; i < values.length - windowSize + 1; i++) {
    if (values[i] > (values[i - windowSize] ?? 0)) {
      increaseCount++;
    }
  }

  return increaseCount;
};
