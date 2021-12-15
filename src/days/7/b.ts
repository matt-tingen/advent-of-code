import { sumBy, uniq } from 'lodash';
import { arithmaticMean } from '../../util/arithmaticMean';

// http://oeis.org/A000217
const cost = (distance: number) => (distance * (distance + 1)) / 2;

export const b = (positions: number[]) => {
  const mean = arithmaticMean(positions);
  const xCandidates = uniq([Math.floor(mean), Math.ceil(mean)]);

  return Math.min(
    ...xCandidates.map((x) =>
      sumBy(positions, (pos) => cost(Math.abs(pos - x))),
    ),
  );
};
