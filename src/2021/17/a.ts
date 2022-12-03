import { maxBy } from 'lodash';
import { triangleNumber } from '../../util/triangleNumber';
import { findTargetHits } from './findTargetHits';
import { TargetArea } from './parse';

export const a = (target: TargetArea) => {
  const hits = findTargetHits(target);
  const bestVy0 = maxBy(hits, (hit) => hit.y)!.y;
  // Only vy0 > 0 was considered so if no hits were found, the peak Y is the
  // initial Y which is 0.
  const peakY = typeof bestVy0 === 'number' ? triangleNumber(bestVy0) : 0;

  return peakY;
};
