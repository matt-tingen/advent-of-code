import { chunk } from 'lodash';
import { parseDecimalInt } from '~/util/parsers';

export type BingoBoard = number[][];

export interface BingoInput {
  callouts: number[];
  boards: BingoBoard[];
}

export const parseBingo = (input: string): BingoInput => {
  const [calloutLine, ...boardLines] = input.split('\n');
  const callouts = calloutLine.split(',').map(parseDecimalInt);

  const boards = chunk(boardLines, 6).map(([, ...lines]) =>
    lines.map((line) => line.trimStart().split(/ +/g).map(parseDecimalInt)),
  );

  return {
    callouts,
    boards,
  };
};
