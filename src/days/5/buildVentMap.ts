import { VentCoordinates } from './parse';

const getIncrement = (start: number, end: number) => {
  if (end > start) return 1;
  if (end < start) return -1;

  return 0;
};

export const buildVentMap = (ventCoords: VentCoordinates[]) => {
  const map: number[][] = [];

  const addVent = (x: number, y: number) => {
    if (!map[y]) {
      map[y] = [];
    }

    map[y][x] = (map[y][x] ?? 0) + 1;
  };

  ventCoords.forEach(([[x1, y1], [x2, y2]]) => {
    const xInc = getIncrement(x1, x2);
    const yInc = getIncrement(y1, y2);

    for (
      let x = x1, y = y1;
      y !== y2 + yInc || x !== x2 + xInc;
      x += xInc, y += yInc
    ) {
      addVent(x, y);
    }
  });

  return map;
};
