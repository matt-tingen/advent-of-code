import { Coords } from './types';

type Move = (coords: Coords) => Coords;

export const north: Move = ([r, c]: Coords): Coords => [r - 1, c];
export const east: Move = ([r, c]: Coords): Coords => [r, c + 1];
export const south: Move = ([r, c]: Coords): Coords => [r + 1, c];
export const west: Move = ([r, c]: Coords): Coords => [r, c - 1];
