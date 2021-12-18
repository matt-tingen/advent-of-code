import { ChunkParseError, parseChunks } from './parseChunks';

export const getChunkParseResult = (line: string) => {
  try {
    return parseChunks(line);
  } catch (error) {
    if (error instanceof ChunkParseError) return error;
    throw error;
  }
};
