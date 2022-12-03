export const countVentOverlaps = (map: number[][]) => {
  const ventCounts = map.flat();
  const overlapCount = ventCounts.filter((count) => count >= 2).length;

  return overlapCount;
};
