import { range } from 'lodash';
import { Grid } from '~/util/grid';
import { map2d } from '~/util/map2d';

export const tileCave = (cave: Grid) => {
  const wrap = (value: number) => (value > 9 ? value - 9 : value);

  const tiledRows = cave.map((row) =>
    range(5).flatMap((increment) =>
      row.map((value) => wrap(value + increment)),
    ),
  );

  const tiledCave = range(5).flatMap((increment) =>
    map2d(tiledRows, (value) => wrap(value + increment)),
  );

  return tiledCave;
};
