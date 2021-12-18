import { sortBy } from 'lodash';
import { getChunkParseResult } from './getChunkParseResult';
import { IncompleteChunkParseError } from './parseChunks';

const charScores = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

export const b = (lines: string[]) => {
  const results = lines.map(getChunkParseResult);

  const missingCharSets = results
    .filter(
      (result): result is IncompleteChunkParseError =>
        result instanceof IncompleteChunkParseError,
    )
    .map((error) => error.missingChars);

  const scores = sortBy(
    missingCharSets.map((missingChars) => {
      let score = 0;
      const chars = missingChars.split('');

      chars.forEach((char) => {
        score *= 5;
        score += charScores[char as keyof typeof charScores];
      });

      return score;
    }),
  );

  const i = Math.floor(scores.length / 2);

  return scores[i];
};
