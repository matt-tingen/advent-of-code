import { addVectors } from './addVectors';
import { Move, Vector } from './types';

export const a = (moves: Move[]) => {
  const vectors: Vector[] = moves.map(({ direction, value }) => {
    const x = direction === 'forward' ? value : 0;
    const y =
      direction === 'forward' ? 0 : value * (direction === 'up' ? -1 : 1);

    return { x, y };
  });

  const { x, y } = addVectors(vectors);

  return x * y;
};
