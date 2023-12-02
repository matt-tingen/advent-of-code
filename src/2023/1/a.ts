import { sum } from 'lodash';

export const a = (lines: string[]) => {
  const values = lines.map((line) => {
    const matches = Array.from(line.matchAll(/\d/g)).map((a) => a[0]);
    const first = parseInt(matches[0], 10);
    const last = parseInt(matches.at(-1)!, 10);

    return first * 10 + last;
  });

  return sum(values);
};
