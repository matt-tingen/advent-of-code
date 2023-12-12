import { flow, range, unzip } from 'lodash';
import { product } from '~/util/product';
import { toInt } from '~/util/toInt';

const parse = (input: string) => {
  const lines = input
    .split('\n')
    .map((line) => line.split(':')[1].trim().split(/\s+/).map(toInt));

  const races = unzip(lines).map(([duration, recordDistance]) => ({
    duration,
    recordDistance,
  }));

  return races;
};

export const a = flow(parse, (races) => {
  const winningStrategies = races.map((race) =>
    range(race.duration)
      .map((speed) => speed * (race.duration - speed))
      .filter((distance) => distance > race.recordDistance),
  );

  return product(winningStrategies.map((strats) => strats.length));
});
