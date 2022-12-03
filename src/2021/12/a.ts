import { buildCave, CaveEdge } from './buildCave';
import { findPaths } from './findPaths';

export const a = (edges: CaveEdge[]) => {
  const start = buildCave(edges);
  const paths = findPaths(start);

  return paths.length;
};
