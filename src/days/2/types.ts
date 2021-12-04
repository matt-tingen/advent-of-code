export type Direction = 'up' | 'down' | 'forward';
export interface Move {
  direction: Direction;
  value: number;
}

export interface Vector {
  x: number;
  y: number;
}
