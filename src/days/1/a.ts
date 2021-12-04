export const countIncreases = (values: number[]) =>
  values.reduce(
    (count, value, i) => (i && value > values[i - 1] ? count + 1 : count),
    0,
  );
