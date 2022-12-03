import { sum } from 'lodash';

export const a = (elves: number[][]) => Math.max(...elves.map(sum));
