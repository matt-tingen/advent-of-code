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
      const xDistance =
        (b.x > a.x ? 1 : -1) *
        sumBy(range(a.x, b.x), (x) => (populatedXs.has(x) ? 1 : factor));
      const yDistance = sumBy(range(a.y, b.y), (y) =>
        populatedYs.has(y) ? 1 : factor,
      );

      return new Vector(xDistance, yDistance);
    };

    const neighborDistances = galaxies
      .slice(0, -1)
      .map((galaxy, i) => distanceBetween(galaxy, galaxies[i + 1]));

    return sum(
      neighborDistances.map((_, startIndex) => {
        let runningSum = Vector.Zero;
        let totalDistance = 0;

        for (let i = startIndex; i < neighborDistances.length; i++) {
          const distance = neighborDistances[i];

          runningSum = runningSum.add(distance);
          totalDistance += Math.abs(runningSum.x) + Math.abs(runningSum.y);
        }

        return totalDistance;
      }),
    );
  });

export const a = solver(2);
export const b = solver(1e6);
