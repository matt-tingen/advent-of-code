import { buildVentMap } from './buildVentMap';
import { countVentOverlaps } from './countVentOverlaps';
import { VentCoordinates } from './parse';

const isCardinal = ([[x1, y1], [x2, y2]]: VentCoordinates) =>
  x1 === x2 || y1 === y2;

export const a = (ventsCoords: VentCoordinates[]) => {
  const map = buildVentMap(ventsCoords.filter(isCardinal));

  return countVentOverlaps(map);
};
