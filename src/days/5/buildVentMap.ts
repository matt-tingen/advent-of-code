import { VentCoordinates } from './parse';

export const buildVentMap = (ventCoords: VentCoordinates[]) => {
  const map: number[][] = [];

  const addVent = (x: number, y: number) => {
    if (!map[y]) {
      map[y] = [];
    }

    map[y][x] = (map[y][x] ?? 0) + 1;
  };

  ventCoords.forEach(([[x1, y1], [x2, y2]]) => {
    if (x1 === x2) {
      const x = x1;

      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        addVent(x, y);
      }
    }

    if (y1 === y2) {
      const y = y1;

      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        addVent(x, y);
      }
    }
  });

  return map;
};
