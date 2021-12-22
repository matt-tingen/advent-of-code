import { parseDecimalInt } from '../../util/parsers';

export interface TargetArea {
  x: [number, number];
  y: [number, number];
}

const intRegex = /([\d-]+)/g;

export const parseTargetArea = (input: string): TargetArea => {
  const [x1, x2, y1, y2] = input.match(intRegex)!.map(parseDecimalInt);

  return { x: [x1, x2], y: [y1, y2] };
};
