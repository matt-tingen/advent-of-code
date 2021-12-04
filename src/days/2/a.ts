import { addVectors } from './addVectors';
import { Vector } from './types';

export const a = (moves: Vector[]) => {
  const { x, y } = addVectors(moves);

  return x * y;
};
