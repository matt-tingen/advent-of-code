import { sortBy, sum } from 'lodash';

export const b = (elves: number[][]) => sum(sortBy(elves.map(sum)).slice(-3));
