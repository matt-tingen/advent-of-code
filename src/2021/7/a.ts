import { sumBy } from 'lodash';
import { median } from '~/util/median';

export const a = (positions: number[]) => {
  const x = median(positions);

  return sumBy(positions, (pos) => Math.abs(pos - x));
};
