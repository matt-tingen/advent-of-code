import { findTargetHits } from './findTargetHits';
import { TargetArea } from './parse';

export const b = (target: TargetArea) => {
  const hits = findTargetHits(target);

  return hits.length;
};
