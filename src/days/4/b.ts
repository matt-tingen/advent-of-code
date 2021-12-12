import { BingoBoard } from './BingoBoard';
import { BingoInput } from './parse';

export const b = (input: BingoInput) => {
  const boards = input.boards.map((b) => new BingoBoard(b));
  const winners = new Set<BingoBoard>();

  for (const value of input.callouts) {
    boards.forEach((board) => {
      board.mark(value);
    });

    const newWinners = boards.filter(
      (board) => board.isComplete && !winners.has(board),
    );

    if (newWinners.length === 1 && winners.size === boards.length - 1) {
      return newWinners[0].getScore();
    }

    newWinners.forEach((winner) => {
      winners.add(winner);
    });
  }
};
