import { modulo } from '~/util/modulo';
import { GameStrategy } from './types';

const aton = (char: string) => char.charCodeAt(0);
const baseOpponentPlay = aton('A');
const baseOwnPlay = aton('X');

const outcomeScores = [3, 6, 0];

export const getStrategyScore = ([opponentPlay, ownPlay]: GameStrategy) => {
  const opponentDiff = aton(opponentPlay) - baseOpponentPlay;
  const ownDiff = aton(ownPlay) - baseOwnPlay;

  const playScore = ownDiff + 1;

  const outcome = modulo(ownDiff - opponentDiff, 3);
  const outcomeScore = outcomeScores[outcome];

  return playScore + outcomeScore;
};
