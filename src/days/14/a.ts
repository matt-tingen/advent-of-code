import { countBy, last, sortBy } from 'lodash';
import { PolymerizationInstructions } from './parse';
import { polymerize } from './polymerize';

export const a = ({ template, rules }: PolymerizationInstructions) => {
  let elements = template;

  for (let i = 0; i < 10; i++) {
    elements = polymerize(elements, rules);
  }

  const elementCounts = countBy(elements);
  const counts = sortBy(Object.values(elementCounts));

  return last(counts)! - counts[0];
};
