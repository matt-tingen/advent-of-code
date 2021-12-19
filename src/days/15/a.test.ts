import { a } from './a';
import { parseDigitGrid } from './parse';

it('provided example', () => {
  expect(
    a(
      parseDigitGrid(
        `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`.trim(),
      ),
    ),
  ).toBe(40);
});
