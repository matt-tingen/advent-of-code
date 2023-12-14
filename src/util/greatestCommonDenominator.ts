// https://en.wikipedia.org/wiki/Euclidean_algorithm
const gcdBinary = (a: number, b: number) => {
  let high = Math.max(a, b);
  let low = Math.min(a, b);

  while (high % low !== 0) {
    const temp = low;

    low = high - Math.floor(high / low) * low;
    high = temp;
  }

  return low;
};

export const greatestCommonDenominator = (values: number[]) =>
  values.reduce(gcdBinary);
