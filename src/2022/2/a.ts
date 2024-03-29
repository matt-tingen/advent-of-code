import { sumBy } from 'lodash';
import { modulo } from '~/util/modulo';
import { GameStrategy } from './types';

export const a = (strategies: GameStrategy[]) =>
  sumBy(strategies, getStrategyScore);

const aton = (char: string) => char.charCodeAt(0);
const baseOpponentPlay = aton('A');
const baseOwnPlay = aton('X');

const outcomeScores = [3, 6, 0];

const getStrategyScore = ([opponentPlay, ownPlay]: GameStrategy) => {
  const opponentDiff = aton(opponentPlay) - baseOpponentPlay;
  const ownDiff = aton(ownPlay) - baseOwnPlay;

  const playScore = ownDiff + 1;

  const outcome = modulo(ownDiff - opponentDiff, 3);
  const outcomeScore = outcomeScores[outcome];

  return playScore + outcomeScore;
};
