import { sumBy } from 'lodash';
import { Vector } from './types';

export const addVectors = (vectors: Vector[]): Vector => ({
  x: sumBy(vectors, 'x'),
  y: sumBy(vectors, 'y'),
});
