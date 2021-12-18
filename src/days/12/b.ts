import { buildCave, CaveEdge } from './buildCave';
import { findPaths } from './findPaths';

export const b = (edges: CaveEdge[]) => {
  const start = buildCave(edges);
  const paths = findPaths(start, 1);

  return paths.length;
};
