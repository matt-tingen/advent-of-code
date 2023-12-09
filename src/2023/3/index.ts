import { flow, isEqual, range, sum, uniqWith } from 'lodash';
import { Coords, east, getCell, moves, west } from '~/util/grid';
import { parseCharGrid } from '~/util/parsers';

const digits = new Set(range(10).map((i) => i.toString()));
const isSymbol = (char: string) => char !== '.' && !digits.has(char);
const isDigit = (char: string | undefined) => char && digits.has(char);

export const a = flow(parseCharGrid, (chars) => {
  const foundPartDigitCoords: Coords[] = [];

  chars.forEach((row, r) => {
    row.forEach((char, c) => {
      if (isSymbol(char)) {
        const coords = [r, c] as const;
        const neighborCoords = moves.map((move) => move(coords));
        const digitCoords = neighborCoords.filter((coords) =>
          isDigit(getCell(chars, coords)),
        );

        foundPartDigitCoords.push(...digitCoords);
      }
    });
  });

  const partStartCoords = uniqWith(
    foundPartDigitCoords.map((coords) => {
      let c = coords;

      while (isDigit(getCell(chars, west(c)))) {
        c = west(c);
      }

      return c;
    }),
    isEqual,
  );

  const partNumbers = partStartCoords.map((startCoords) => {
    const digits = [getCell(chars, startCoords)!];

    let c = east(startCoords);

    while (isDigit(getCell(chars, c))) {
      digits.push(getCell(chars, c)!);
      c = east(c);
    }

    return parseInt(digits.join(''), 10);
  });

  return sum(partNumbers);
});
