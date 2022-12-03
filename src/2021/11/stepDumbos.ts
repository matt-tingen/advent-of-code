import { cloneDeep } from 'lodash';
import { forEach2d } from '../../util/forEach2d';
import { Coords, getCell, Grid, moves, setCell } from '../../util/grid';

const FLASH_VALUE = -Infinity;

export const stepDumbos = (
  initialGrid: Grid,
): [grid: Grid, flashes: Coords[]] => {
  const grid = cloneDeep(initialGrid);
  const flashes: Coords[] = [];

  const increment = (coords: Coords) => {
    const value = getCell(grid, coords);
    if (value === undefined) return;

    const didFlash = value === 9;
    const newValue = didFlash ? FLASH_VALUE : value + 1;

    setCell(grid, coords, newValue);

    if (didFlash) {
      flashes.push(coords);
    }
  };

  forEach2d(grid, (value, r, c) => {
    increment([r, c]);
  });

  for (let i = 0; i < flashes.length; i++) {
    moves.forEach((move) => {
      increment(move(flashes[i]));
    });
  }

  forEach2d(grid, (value, r, c) => {
    if (value === FLASH_VALUE) {
      setCell(grid, [r, c], 0);
    }
  });

  return [grid, flashes];
};
