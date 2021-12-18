import { countBy } from 'lodash';

export type Counts = Record<string, number>;

export interface PolymerSummary {
  elementCounts: Counts;
  pairCounts: Counts;
}

export const summarizePolymer = (polymer: string): PolymerSummary => {
  const elementCounts = countBy(polymer);

  const pairCounts: Counts = {};

  for (let i = 0; i < polymer.length - 1; i++) {
    const pair = polymer[i] + polymer[i + 1];

    pairCounts[pair] = (pairCounts[pair] ?? 0) + 1;
  }

  return {
    elementCounts,
    pairCounts,
  };
};
