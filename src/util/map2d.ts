export const map2d = <T, U>(
  values: readonly (readonly T[])[],
  iteree: (value: T, row: number, col: number) => U,
): U[][] => values.map((row, r) => row.map((value, c) => iteree(value, r, c)));
