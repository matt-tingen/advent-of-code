import { CaveEdge } from './buildCave';

export const parseCaveEdges = (input: string): CaveEdge[] => {
  const lines = input.split('\n');

  return lines.map((line) => line.split('-') as CaveEdge);
};
