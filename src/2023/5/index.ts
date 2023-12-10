import { chunk, flow, min, sortBy } from 'lodash';
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

export const mapRange = (range: Range, mapRows: MapRow[]) => {
  const sortedMapRows = sortBy(mapRows, (row) => row.from.start).filter(
    (row) => !(row.from.end < range.start) && !(row.from.start > range.end),
  );

  const rangeSlices: Range[] = [];
  let priorSliceEnd: number = range.start;

  for (const { from, to } of sortedMapRows) {
    const rawSlice: Range = {
      start: Math.max(range.start, from.start),
      end: Math.min(range.end, from.end),
    };

    if (rawSlice.start > priorSliceEnd) {
      rangeSlices.push({
        start: priorSliceEnd,
        end: rawSlice.start,
      });
    }

    priorSliceEnd = rawSlice.end;
    const diff = to.start - from.start;

    rangeSlices.push({
      start: rawSlice.start + diff,
      end: rawSlice.end + diff,
    });
  }

  if (priorSliceEnd < range.end || priorSliceEnd === range.start) {
    rangeSlices.push({ start: priorSliceEnd, end: range.end });
  }

  return rangeSlices;
};

export const a = flow(parse, ({ seeds, maps }) => {
  const seedLocations = seeds.map((seed) =>
    maps.reduce((value, map) => mapValue(value, map), seed),
  );

  return min(seedLocations);
});

type Range = { start: number; end: number };
interface MapRow {
  from: Range;
  to: Range;
}

export const b = flow(parse, (almanac) => {
  const seedRanges = chunk(almanac.seeds, 2).map(
    ([start, length]): Range => ({ start, end: start + length }),
  );

  const maps = almanac.maps.map((map) =>
    map.map(
      ([destStart, sourceStart, length]): MapRow => ({
        from: { start: sourceStart, end: sourceStart + length },
        to: { start: destStart, end: destStart + length },
      }),
    ),
  );

  const locationRanges = seedRanges.flatMap((range) =>
    maps.reduce(
      (ranges, map) => ranges.flatMap((range) => mapRange(range, map)),
      [range],
    ),
  );

  return min(locationRanges.map((range) => range.start));
});
