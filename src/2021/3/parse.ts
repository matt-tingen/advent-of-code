export const parse = (string: string) =>
  string.split('\n').map((line) => line.split(''));
