import Heap from 'heap';
import { DefaultMap } from './DefaultMap';

const reconstructPath = <N>(cameFrom: Map<N, N>, goal: N) => {
  let current = goal;
  const totalPath = [current];

  while (cameFrom.has(current)) {
    current = cameFrom.get(current)!;
    totalPath.unshift(current);
  }

  return totalPath;
};

/**
 * Find the cheapest path between two nodes
 *
 * @param start The starting node
 * @param goal The goal node
 * @param getNeighbors A function which returns the neighbors of the specified node
 * @param estimateCost A heuristic function to estimate the cost from a given node to the goal
 * @param getEdgeCost A function which returns the cost of moving between two nodes
 * @returns A sequence of nodes representing the cheapest path or null if there is no valid path
 */
export const findCheapestPath = <N>(
  start: N,
  goal: N,
  getNeighbors: (node: N) => N[],
  estimateCost: (node: N) => number,
  getEdgeCost: (from: N, to: N) => number,
) => {
  // Based on https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode
  const cameFrom = new Map<N, N>();
  const gScore = new DefaultMap<N, number>(Infinity, [[start, 0]]);
  const fScore = new DefaultMap<N, number>(Infinity, [
    [start, estimateCost(start)],
  ]);
  const openSet = new Heap<N>((a, b) => fScore.get(a) - fScore.get(b));

  openSet.push(start);

  while (!openSet.empty()) {
    const current = openSet.pop();

    if (current === goal) return reconstructPath(cameFrom, current);

    getNeighbors(current).forEach((neighbor) => {
      const tentativeGScore =
        gScore.get(current) + getEdgeCost(current, neighbor);

      if (tentativeGScore < gScore.get(neighbor)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, tentativeGScore + estimateCost(neighbor));
        openSet.push(neighbor);
      }
    });
  }

  return null;
};
