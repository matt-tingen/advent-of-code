import { sumBy } from 'lodash';
import {
  ChunkParseError,
  CorruptChunkParseError,
  parseChunks,
} from './parseChunks';

const scores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

export const a = (lines: string[]) => {
  const results = lines.map((line) => {
    try {
      return parseChunks(line);
    } catch (error) {
      if (error instanceof ChunkParseError) return error;
      throw error;
    }
  });

  const corruptChars = results
    .filter(
      (result): result is CorruptChunkParseError =>
        result instanceof CorruptChunkParseError,
    )
    .map((error) => error.illegalChar);

  return sumBy(corruptChars, (char) => scores[char as keyof typeof scores]);
};
