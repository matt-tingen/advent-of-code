import { BingoBoard } from './BingoBoard';
import { BingoInput } from './parse';

export const a = (input: BingoInput) => {
  const boards = input.boards.map((b) => new BingoBoard(b));

  for (const value of input.callouts) {
    boards.forEach((board) => {
      board.mark(value);
    });

    const winner = boards.find((board) => board.isComplete);

    if (winner) {
      return winner.getScore();
    }
  }
};
