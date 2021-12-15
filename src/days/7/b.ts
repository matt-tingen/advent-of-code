import { sumBy, uniq } from 'lodash';
import { arithmaticMean } from '../../util/arithmaticMean';

// http://oeis.org/A000217
const cost = (distance: number) => (distance * (distance + 1)) / 2;

export const b = (positions: number[]) => {
  const mean = arithmaticMean(positions);
  // See https://old.reddit.com/r/adventofcode/comments/rawxad/2021_day_7_part_2_i_wrote_a_paper_on_todays/
  const xCandidates = uniq([Math.floor(mean), Math.ceil(mean)]);

  return Math.min(
    ...xCandidates.map((x) =>
      sumBy(positions, (pos) => cost(Math.abs(pos - x))),
    ),
  );
};
