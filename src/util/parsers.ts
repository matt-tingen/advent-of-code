import { flow, partialRight, unary } from 'lodash';
import { map } from 'lodash/fp';
import { BitStream } from './BitStream';

export const parseDecimalInt = unary(partialRight(parseInt, 10));
export const parseBinaryInt = unary(partialRight(parseInt, 2));
export const parseCsv = (text: string) => text.split(',');

const intsRegex = /-?\d+/g;
/** Extracts decimal integers, ignoring all other characters in the input string. */
export const extractInts = (text: string) =>
  Array.from(text.matchAll(intsRegex)).flat().map(parseDecimalInt);

export const parseStringLines = (string: string) => string.split('\n');
export const parseIntLines = flow(parseStringLines, map(parseDecimalInt));
export const parseBinaryLines = flow(parseStringLines, map(parseBinaryInt));
export const parseCsvInts = flow(parseCsv, map(parseDecimalInt));
export const parseCharGrid = flow(
  parseStringLines,
  map((line) => line.split('')),
);
export const parseDigitGrid = flow(
  parseStringLines,
  map((line) => line.split('').map(parseDecimalInt)),
);
export const parseIntGrid = flow(
  parseStringLines,
  map((line) => line.split(' ').map(parseDecimalInt)),
);
export const parseBitStream = (hex: string) => new BitStream(hex);
