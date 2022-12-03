import { isEqual, uniqWith } from 'lodash';

export interface Dot {
  x: number;
  y: number;
}

export interface Fold {
  direction: 'x' | 'y';
  axis: number;
}

const flip = (value: number, axis: number) =>
  value > axis ? value - 2 * (value - axis) : value;

export const foldTransparency = (dots: Dot[], fold: Fold): Dot[] =>
  uniqWith(
    dots.map(({ x, y }) => ({
      x: fold.direction === 'x' ? flip(x, fold.axis) : x,
      y: fold.direction === 'y' ? flip(y, fold.axis) : y,
    })),
    isEqual,
  );
