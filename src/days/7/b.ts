import { sumBy, uniq } from 'lodash';
import { arithmaticMean } from '../../util/arithmaticMean';
import { triangleNumber } from '../../util/triangleNumber';

export const b = (positions: number[]) => {
  const mean = arithmaticMean(positions);
  // See https://old.reddit.com/r/adventofcode/comments/rawxad/2021_day_7_part_2_i_wrote_a_paper_on_todays/
  const xCandidates = uniq([Math.floor(mean), Math.ceil(mean)]);

  return Math.min(
    ...xCandidates.map((x) =>
      sumBy(positions, (pos) => triangleNumber(Math.abs(pos - x))),
    ),
  );
};
