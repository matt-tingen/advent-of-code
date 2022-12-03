import { sumBy } from 'lodash';
import { modulo } from '~/util/modulo';
import { GameStrategy } from './types';

export const b = (strategies: GameStrategy[]) =>
  sumBy(strategies, getStrategyScore);

const aton = (char: string) => char.charCodeAt(0);
const baseOpponentPlay = aton('A');
const baseOutcome = aton('X');

const outcomeScores = [0, 3, 6];

const getStrategyScore = ([opponentPlay, outcomeChar]: GameStrategy) => {
  const opponentDiff = aton(opponentPlay) - baseOpponentPlay;

  const outcome = aton(outcomeChar) - baseOutcome;
  const outcomeScore = outcomeScores[outcome];

  const ownDiff = modulo(opponentDiff + outcome - 1, 3);
  const playScore = ownDiff + 1;

  return playScore + outcomeScore;
};
