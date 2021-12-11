import { flow, partialRight, unary } from 'lodash';
import { map } from 'lodash/fp';

export const parseDecimalInt = unary(partialRight(parseInt, 10));
export const parseBinaryInt = unary(partialRight(parseInt, 2));

export const parseStringLines = (string: string) => string.split('\n');
export const parseIntLines = flow(parseStringLines, map(parseDecimalInt));
export const parseBinaryLines = flow(parseStringLines, map(parseBinaryInt));
