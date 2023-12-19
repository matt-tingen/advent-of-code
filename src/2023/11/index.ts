import { flow, range, sum, sumBy } from 'lodash';
import { forEach2d } from '~/util/forEach2d';
import { parseCharGrid } from '~/util/parsers';
import { vec, Vector } from '~/util/vector';

const solver = (factor: number) =>
  flow(parseCharGrid, (grid) => {
    const populatedXs = new Set<number>();
    const populatedYs = new Set<number>();

    const galaxies: Vector[] = [];

    forEach2d(grid, (char, row, col) => {
      if (char === '#') {
        populatedXs.add(col);
        populatedYs.add(row);
        galaxies.push(vec(col, row));
      }
    });

    const distanceBetween = (a: Vector, b: Vector) => {
      const xDistance = sumBy(range(a.x, b.x), (x) =>
        populatedXs.has(x) ? 1 : factor,
      );
      const yDistance = sumBy(range(a.y, b.y), (y) =>
        populatedYs.has(y) ? 1 : factor,
      );

      return xDistance + yDistance;
    };

    return sum(
      galaxies.map((g1, i) =>
        sumBy(galaxies.slice(i + 1), (g2) => distanceBetween(g1, g2)),
      ),
    );
  });

export const a = solver(2);
export const b = solver(1e6);
