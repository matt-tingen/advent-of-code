import { flow, min } from 'lodash';
import { toInt } from '~/util/toInt';

const parse = (input: string) => {
  const [seedsSection, ...mapSections] = input.split('\n\n');

  const seeds = seedsSection.replace('seeds: ', '').split(' ').map(toInt);

  const maps = mapSections.map((section) => {
    // Skip title
    const [, ...lines] = section.split('\n');

    return lines.map((line) => line.split(' ').map(toInt));
  });

  return {
    seeds,
    maps,
  };
};

const mapValue = (sourceValue: number, map: number[][]) => {
  for (const [destStart, sourceStart, length] of map) {
    const diff = sourceValue - sourceStart;

    if (diff >= 0 && diff < length) {
      return destStart + diff;
    }
  }

  return sourceValue;
};

export const a = flow(parse, (almanac) => {
  const { seeds, maps } = almanac;

  const seedLocations = seeds.map((seed) =>
    maps.reduce((value, map) => mapValue(value, map), seed),
  );

  return min(seedLocations);
});
