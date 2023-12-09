import { flow, isEqual, range, sum, uniqWith } from 'lodash';
import { Coords, east, getCell, Grid, moves, west } from '~/util/grid';
import { parseCharGrid } from '~/util/parsers';
import { product } from '~/util/product';

const digits = new Set(range(10).map((i) => i.toString()));
const isSymbol = (char: string) => char !== '.' && !digits.has(char);
const isDigit = (char: string | undefined) => char && digits.has(char);

const findPartStart = (grid: Grid<string>, digitCoords: Coords) => {
  let c = digitCoords;

  while (isDigit(getCell(grid, west(c)))) {
    c = west(c);
  }

  return c;
};

const getPartNumber = (grid: Grid<string>, startCoords: Coords) => {
  const digits = [getCell(grid, startCoords)!];

  let c = east(startCoords);

  while (isDigit(getCell(grid, c))) {
    digits.push(getCell(grid, c)!);
    c = east(c);
  }

  return parseInt(digits.join(''), 10);
};

const getUniquePartStarts = (grid: Grid<string>, digitCoords: Coords[]) =>
  uniqWith(
    digitCoords.map((c) => findPartStart(grid, c)),
    isEqual,
  );

export const a = flow(parseCharGrid, (grid) => {
  const foundPartDigitCoords: Coords[] = [];

  grid.forEach((row, r) => {
    row.forEach((char, c) => {
      if (isSymbol(char)) {
        const coords = [r, c] as const;
        const neighborCoords = moves.map((move) => move(coords));
        const digitCoords = neighborCoords.filter((coords) =>
          isDigit(getCell(grid, coords)),
        );

        foundPartDigitCoords.push(...digitCoords);
      }
    });
  });

  const partStartCoords = getUniquePartStarts(grid, foundPartDigitCoords);

  const partNumbers = partStartCoords.map((c) => getPartNumber(grid, c));

  return sum(partNumbers);
});

export const b = flow(parseCharGrid, (grid) => {
  const gearRatios: number[] = [];

  grid.forEach((row, r) => {
    row.forEach((char, c) => {
      if (char === '*') {
        const coords = [r, c] as const;
        const neighborCoords = moves.map((move) => move(coords));
        const digitCoords = neighborCoords.filter((coords) =>
          isDigit(getCell(grid, coords)),
        );

        const partStarts = getUniquePartStarts(grid, digitCoords);

        if (partStarts.length === 2) {
          const gearRatio = product(
            partStarts.map((c) => getPartNumber(grid, c)),
          );

          gearRatios.push(gearRatio);
        }
      }
    });
  });

  return sum(gearRatios);
});
