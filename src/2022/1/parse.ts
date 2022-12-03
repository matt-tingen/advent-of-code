import { parseDecimalInt } from '~/util/parsers';

export const parse = (text: string): number[][] =>
  text.split('\n').reduce(
    (acc, line) => {
      if (line) {
        acc.at(-1)!.push(parseDecimalInt(line));
      } else {
        acc.push([]);
      }

      return acc;
    },
    [[]] as number[][],
  );
