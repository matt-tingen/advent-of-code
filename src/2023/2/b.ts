import { maxBy, sumBy } from 'lodash';
import { product } from '~/util/product';
import { Game } from './parse';

const getMinimumBag = (game: Game) => ({
  green: maxBy(game.subsets, (s) => s.green)!.green,
  red: maxBy(game.subsets, (s) => s.red)!.red,
  blue: maxBy(game.subsets, (s) => s.blue)!.blue,
});

export const b = (games: Game[]) => {
  const minBags = games.map(getMinimumBag);

  return sumBy(minBags, (b) => product([b.red, b.green, b.blue]));
};
