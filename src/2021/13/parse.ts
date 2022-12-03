import { parseDecimalInt } from '~/util/parsers';
import { Dot, Fold } from './foldTransparency';

export interface FoldingInstructions {
  dots: Dot[];
  folds: Fold[];
}

export const parseFoldingInstructions = (
  input: string,
): FoldingInstructions => {
  const [dots, folds] = input.split('\n\n');

  return {
    dots: dots.split('\n').map((line) => {
      const [x, y] = line.split(',').map(parseDecimalInt);

      return { x, y } as Dot;
    }),
    folds: folds.split('\n').map((line) => {
      const [direction, axis] = line.replace('fold along ', '').split('=');

      return { direction, axis: parseDecimalInt(axis) } as Fold;
    }),
  };
};
