import dedent from 'dedent';
import { a, b, mapRange } from '.';

const input = dedent`
  seeds: 79 14 55 13

  seed-to-soil map:
  50 98 2
  52 50 48

  soil-to-fertilizer map:
  0 15 37
  37 52 2
  39 0 15

  fertilizer-to-water map:
  49 53 8
  0 11 42
  42 0 7
  57 7 4

  water-to-light map:
  88 18 7
  18 25 70

  light-to-temperature map:
  45 77 23
  81 45 19
  68 64 13

  temperature-to-humidity map:
  0 69 1
  1 0 69

  humidity-to-location map:
  60 56 37
  56 93 4
`;

it('solves provided a', () => {
  expect(a(input)).toBe(35);
});

it('solves provided b', () => {
  expect(b(input)).toBe(46);
});

describe('mapRange', () => {
  it('handles provided seed-to-soil', () => {
    const range = { start: 79, end: 93 };
    const map = [
      { from: { start: 50, end: 52 }, to: { start: 98, end: 100 } },
      { from: { start: 52, end: 100 }, to: { start: 50, end: 98 } },
    ];

    expect(mapRange(range, map)).toEqual([{ start: 77, end: 91 }]);
  });

  it('handles gap', () => {
    const range = { start: 0, end: 100 };
    const map = [
      { from: { start: 10, end: 20 }, to: { start: 20, end: 30 } },
      { from: { start: 50, end: 70 }, to: { start: 60, end: 80 } },
    ];

    expect(mapRange(range, map)).toEqual([
      { start: 0, end: 10 },
      { start: 20, end: 30 },
      { start: 20, end: 50 },
      { start: 60, end: 80 },
      { start: 70, end: 100 },
    ]);
  });

  it('handles start-straddling map row', () => {
    const range = { start: 10, end: 20 };
    const map = [{ from: { start: 5, end: 15 }, to: { start: 105, end: 115 } }];

    expect(mapRange(range, map)).toEqual([
      { start: 110, end: 115 },
      { start: 15, end: 20 },
    ]);
  });

  it('handles end-straddling map row', () => {
    const range = { start: 0, end: 100 };
    const map = [
      { from: { start: 50, end: 150 }, to: { start: 150, end: 250 } },
    ];

    expect(mapRange(range, map)).toEqual([
      { start: 0, end: 50 },
      { start: 150, end: 200 },
    ]);
  });
});
