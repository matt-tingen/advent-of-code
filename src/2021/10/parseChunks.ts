/* eslint-disable max-classes-per-file */
export type ChunkType = 'paren' | 'square' | 'curly' | 'angle';

export interface Chunk {
  type: ChunkType;
  children: Chunk[];
}

const starts: Partial<Record<string, ChunkType>> = {
  '(': 'paren',
  '[': 'square',
  '{': 'curly',
  '<': 'angle',
};

const ends: Record<ChunkType, string> = {
  paren: ')',
  square: ']',
  curly: '}',
  angle: '>',
};

export class ChunkParseError extends Error {}

export class CorruptChunkParseError extends ChunkParseError {
  constructor(public illegalChar: string) {
    super('Unable to parse corrupt chunk');
  }
}

export class IncompleteChunkParseError extends ChunkParseError {
  constructor(public missingChars: string) {
    super('Unable to parse incomplete chunk');
  }
}

class IncompletePropagationError extends Error {}

export const parseChunks = (input: string): Chunk[] => {
  const chars = input.split('');
  const take = () => chars.shift();
  const peek = () => chars[0] as string | undefined;
  let missingChars = '';

  const parseChunk = (initialChar: string): Chunk => {
    let char: string | undefined = initialChar;

    const type = starts[char];
    if (!type) throw new CorruptChunkParseError(char);

    const end = ends[type];

    const chunk: Chunk = { type, children: [] };

    do {
      char = take();

      if (!char) {
        missingChars += end;
        throw new IncompletePropagationError();
      }

      if (char !== end) {
        try {
          chunk.children.push(parseChunk(char));
        } catch (error) {
          if (!(error instanceof IncompletePropagationError)) throw error;
        }
      }
    } while (char !== end);

    return chunk;
  };

  const chunks: Chunk[] = [];

  while (peek()) {
    try {
      chunks.push(parseChunk(take()!));
    } catch (error) {
      if (!(error instanceof IncompletePropagationError)) throw error;
    }
  }

  if (missingChars) throw new IncompleteChunkParseError(missingChars);

  return chunks;
};
