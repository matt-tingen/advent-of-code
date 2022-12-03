import { sumBy } from 'lodash';
import { getStrategyScore } from './getStrategyScore';
import { GameStrategy } from './types';

export const a = (strategies: GameStrategy[]) =>
  sumBy(strategies, getStrategyScore);
