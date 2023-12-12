import { flow, unzip } from 'lodash';
import { product } from '~/util/product';
import { toInt } from '~/util/toInt';

interface Race {
  duration: number;
  recordDistance: number;
}

const parse = (input: string): Race[] => {
  const lines = input
    .split('\n')
    .map((line) => line.split(':')[1].trim().split(/\s+/).map(toInt));

  const races = unzip(lines).map(([duration, recordDistance]) => ({
    duration,
    recordDistance,
  }));

  return races;
};

const isWinningStrategy = (race: Race, windTime: number) =>
  windTime * (race.duration - windTime) > race.recordDistance;

const countWinningStrategies = (race: Race) => {
  const { duration, recordDistance } = race;
  // Via quadratic equation `distance = speed * (duration - windTime)`
  // where `speed = windTime`. The negative solution is discarded.
  const windTimeToMatchRecord =
    0.5 * (duration + Math.sqrt(duration ** 2 - 4 * recordDistance));

  let numberOfWinningStrategies = 0;
  // Largest int strictly less than `windTimeToMatchRecord`
  let windTime = Math.ceil(windTimeToMatchRecord - 1);

  while (isWinningStrategy(race, windTime)) {
    numberOfWinningStrategies++;
    windTime--;
  }

  // Smallest int strictly greater than `windTimeToMatchRecord`
  windTime = Math.floor(windTimeToMatchRecord + 1);

  while (isWinningStrategy(race, windTime)) {
    numberOfWinningStrategies++;
    windTime++;
  }

  return numberOfWinningStrategies;
};

export const a = flow(parse, (races) =>
  product(races.map(countWinningStrategies)),
);

export const b = flow((input: string): Race => {
  const [duration, recordDistance] = input
    .split('\n')
    .map((line) => toInt(line.split(':')[1].replaceAll(' ', '')));

  return { duration, recordDistance };
}, countWinningStrategies);
