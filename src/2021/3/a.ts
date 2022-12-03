/* eslint-disable no-bitwise */

export const a = (values: string[][]) => {
  const size = values[0].length;
  const onesBitCounts = Array<number>(size).fill(0);

  values.forEach((value) => {
    value.forEach((bitString, i) => {
      if (bitString === '1') {
        onesBitCounts[i]++;
      }
    });
  });

  const halfLength = values.length / 2;
  const gamma = onesBitCounts.reduce((value, onesBitCount, i) => {
    const change = onesBitCount > halfLength ? 1 << (size - i - 1) : 0;

    return value + change;
  }, 0);

  // A number of 1s equal to `size`.
  const mask = (1 << size) - 1;
  // Disregard all the leading 1s that result from negation.
  const epsilon = ~gamma & mask;

  return gamma * epsilon;
};
