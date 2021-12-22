/**
 * Calculates the nth triangle number which is equal to 1 + 2 + ... + n
 *
 * @see http://oeis.org/A000217
 */
export const triangleNumber = (n: number) => (n * (n + 1)) / 2;

/**
 * @see http://oeis.org/A003056
 */
export const inverseTriangleNumber = (sum: number) =>
  Math.floor((Math.sqrt(1 + 8 * sum) - 1) / 2);
