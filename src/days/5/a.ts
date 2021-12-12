import { buildVentMap } from './buildVentMap';
import { VentCoordinates } from './parse';

export const a = (ventsCoords: VentCoordinates[]) => {
  const map = buildVentMap(ventsCoords);
  const ventCounts = map.flat();
  const overlapCount = ventCounts.filter((count) => count >= 2).length;

  return overlapCount;
};
