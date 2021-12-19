import { sumBy } from 'lodash';
import { findCheapestPath } from '../../util/findCheapestPath';
import { cardinalMoves, Coords, getCell, Grid } from '../../util/grid';
import { isTruthy } from '../../util/isTruthy';
import { map2d } from '../../util/map2d';

interface Node {
  risk: number;
  coords: Coords;
}

export const findCheapestCavePath = (grid: Grid) => {
  const nodeGrid = map2d(
    grid,
    (risk, r, c): Node => ({
      risk,
      coords: [r, c],
    }),
  );

  const maxR = nodeGrid.length - 1;
  const maxC = nodeGrid[0].length - 1;

  const start = nodeGrid[0][0];
  const goal = nodeGrid[maxR][maxC];

  const path = findCheapestPath(
    start,
    goal,
    (node) =>
      cardinalMoves
        .map((move) => getCell(nodeGrid, move(node.coords)))
        .filter(isTruthy),
    ({ coords: [r, c] }) => maxR - r + maxC - c,
    (from, to) => to.risk,
  )!;

  const totalRisk = sumBy(path.slice(1), (node) => node.risk);

  return totalRisk;
};
