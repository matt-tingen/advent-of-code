import { Grid } from '../../util/grid';
import { findCheapestCavePath } from './findCheapestCavePath';
import { tileCave } from './tileCave';

export const b = (tile: Grid) => {
  const fullGrid = tileCave(tile);

  return findCheapestCavePath(fullGrid);
};
