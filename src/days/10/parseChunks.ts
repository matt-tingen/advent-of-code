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
  constructor() {
    super('Unable to parse incomplete chunk');
  }
}

export const parseChunks = (input: string): Chunk[] => {
  const chars = input.split('');
  const take = () => chars.shift();
  const peek = () => chars[0] as string | undefined;

  const parseChunk = (initialChar: string): Chunk => {
    let char: string | undefined = initialChar;

    const type = starts[char];
    if (!type) throw new CorruptChunkParseError(char);

    const end = ends[type];

    const chunk: Chunk = { type, children: [] };

    do {
      char = take();
      if (!char) throw new IncompleteChunkParseError();

      if (char !== end) {
        chunk.children.push(parseChunk(char));
      }
    } while (char !== end);

    return chunk;
  };

  const chunks: Chunk[] = [];

  while (peek()) {
    chunks.push(parseChunk(take()!));
  }

  return chunks;
};
