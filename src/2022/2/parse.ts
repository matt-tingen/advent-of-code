import { GameStrategy } from './types';

export const parse = (text: string) =>
  text.split('\n').map((line) => line.split(' ') as GameStrategy);
