import { flow } from 'lodash';
import { parseStringLines } from '~/util/parsers';

export interface Cubes {
  green: number;
  red: number;
  blue: number;
}

export interface Game {
  id: number;
  subsets: Cubes[];
}

const defaultSubset: Cubes = {
  green: 0,
  red: 0,
  blue: 0,
};

export const parse = flow(parseStringLines, (lines) =>
  lines.map((line): Game => {
    const [preamble, body] = line.split(': ');
    const id = parseInt(preamble.split(' ')[1], 10);

    const subsets = body.split('; ').map((text) => {
      const draw = Object.fromEntries(
        text.split(', ').map((draw) => {
          const [count, color] = draw.split(' ');

          return [color as keyof Cubes, parseInt(count, 10)] as const;
        }),
      ) as Partial<Cubes>;

      return {
        ...defaultSubset,
        ...draw,
      };
    });

    return { id, subsets };
  }),
);
