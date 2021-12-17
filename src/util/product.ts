export const product = (values: number[]) =>
  values.reduce((product, value) => product * value, 1);
