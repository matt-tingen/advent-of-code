import { buildVentMap } from './buildVentMap';
import { countVentOverlaps } from './countVentOverlaps';
import { VentCoordinates } from './parse';

export const b = (ventsCoords: VentCoordinates[]) => {
  const map = buildVentMap(ventsCoords);

  return countVentOverlaps(map);
};
