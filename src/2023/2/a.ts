import { sumBy } from 'lodash';
import { Cubes, Game } from './parse';

const isBagPossible = (bag: Cubes, game: Game) =>
  game.subsets.every(
    (subset) =>
      subset.green <= bag.green &&
      subset.red <= bag.red &&
      subset.blue <= bag.blue,
  );

export const a = (games: Game[]) => {
  const bag = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const possibleGames = games.filter((game) => isBagPossible(bag, game));

  return sumBy(possibleGames, (g) => g.id);
};
