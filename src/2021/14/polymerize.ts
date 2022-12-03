import { cloneDeep } from 'lodash';
import { PolymerizationRules } from './parse';
import { PolymerSummary } from './summarizePolymer';

export const polymerize = (
  polymer: PolymerSummary,
  rules: PolymerizationRules,
): PolymerSummary => {
  const newPolymer = cloneDeep(polymer);

  Object.entries(rules).forEach(([pair, result]) => {
    const insertionCount = polymer.pairCounts[pair] ?? 0;

    if (insertionCount) {
      newPolymer.elementCounts[result] =
        (newPolymer.elementCounts[result] ?? 0) + insertionCount;

      newPolymer.pairCounts[pair] -= insertionCount;

      const newPairs = [pair[0] + result, result + pair[1]];

      newPairs.forEach((newPair) => {
        newPolymer.pairCounts[newPair] =
          (newPolymer.pairCounts[newPair] ?? 0) + insertionCount;
      });
    }
  });

  return newPolymer;
};
