import { Move } from './types';

export const b = (moves: Move[]) => {
  let aim = 0;
  let x = 0;
  let y = 0;

  moves.forEach(({ direction, value }) => {
    if (direction === 'forward') {
      x += value;
      y += aim * value;
    } else {
      aim += value * (direction === 'up' ? -1 : 1);
    }
  });

  return x * y;
};
