import { Immutable } from '~/util/Immutable';
import { extractInts } from '~/util/parsers';

export type VentCoordinates = Immutable<[[number, number], [number, number]]>;

export const parseVents = (input: string): VentCoordinates[] =>
  input.split('\n').map((line) => {
    const [x1, y1, x2, y2] = extractInts(line);

    return [
      [x1, y1],
      [x2, y2],
    ] as const;
  });
