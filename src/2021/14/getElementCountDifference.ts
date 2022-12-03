import { last, sortBy } from 'lodash';
import { PolymerizationInstructions } from './parse';
import { polymerize } from './polymerize';
import { summarizePolymer } from './summarizePolymer';

export const getElementCountDifference =
  (steps: number) =>
  ({ template, rules }: PolymerizationInstructions) => {
    let summary = summarizePolymer(template);

    for (let i = 0; i < steps; i++) {
      summary = polymerize(summary, rules);
    }

    const counts = sortBy(Object.values(summary.elementCounts));

    return last(counts)! - counts[0];
  };
