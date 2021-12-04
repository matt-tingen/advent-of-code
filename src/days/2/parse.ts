import { Direction, Move } from './types';

export const parse = (text: string): Move[] =>
  text.split('\n').map((line) => {
    const [direction, rawValue] = line.split(' ');
    const value = parseInt(rawValue, 10);

    return { direction: direction as Direction, value };
  });
