import { Vector } from './types';

export const parse = (text: string): Vector[] =>
  text.split('\n').map((line) => {
    const [direction, rawDistance] = line.split(' ');
    const distance = parseInt(rawDistance, 10);
    const x = direction === 'forward' ? distance : 0;
    const y = { up: -distance, down: distance }[direction] ?? 0;

    return { x, y };
  });
