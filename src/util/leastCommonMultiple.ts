import { greatestCommonDenominator } from './greatestCommonDenominator';

// https://en.wikipedia.org/wiki/Least_common_multiple#Using_the_greatest_common_divisor
const lcmBinary = (a: number, b: number) =>
  (Math.abs(a) * Math.abs(b)) / greatestCommonDenominator([a, b]);

export const leastCommonMultiple = (values: number[]) =>
  values.reduce(lcmBinary);
