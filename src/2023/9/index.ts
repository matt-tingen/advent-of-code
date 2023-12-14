import { flow, sumBy } from 'lodash';
import { toInt } from '~/util/toInt';

const parse = (input: string) =>
  input.split('\n').map((line) => line.split(' ').map(toInt));

const buildDifferencePyramid = (data: number[]) => {
  const rows = [data];

  while (!rows.at(-1)!.every((value) => value === 0)) {
    rows.push(
      rows
        .at(-1)!
        .slice(1)
        .map((value, i) => value - rows.at(-1)![i]),
    );
  }

  return rows;
};

export const a = flow(parse, (histories) =>
  sumBy(histories, (data: number[]) => {
    const rows = buildDifferencePyramid(data);

    for (let i = rows.length - 1; i >= 0; i--) {
      const row = rows[i];
      const lowerRow = rows.at(i + 1);

      row.push(row.at(-1)! + (lowerRow?.at(-1) ?? 0));
    }

    return rows[0].at(-1)!;
  }),
);

export const b = flow(parse, (histories) =>
  sumBy(histories, (data: number[]) => {
    const rows = buildDifferencePyramid(data);

    for (let i = rows.length - 1; i >= 0; i--) {
      const row = rows[i];
      const lowerRow = rows.at(i + 1);

      row.unshift(row[0] - (lowerRow?.[0] ?? 0));
    }

    return rows[0][0];
  }),
);
