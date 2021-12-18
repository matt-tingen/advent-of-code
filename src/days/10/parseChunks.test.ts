import { castArray, partial } from 'lodash';
import {
  Chunk,
  ChunkType,
  CorruptChunkParseError,
  IncompleteChunkParseError,
  parseChunks,
} from './parseChunks';

const testParse = createMacro(
  (input: string, expected: Chunk | Chunk[]) => {
    expect(parseChunks(input)).toEqual(castArray(expected));
  },
  (provided, input) => `parses ${input || provided}`,
);

const testIncomplete = createMacro(
  (input: string) => {
    expect(() => parseChunks(input)).toThrow(IncompleteChunkParseError);
  },
  (provided, input) => `considers ${input || provided} incomplete`,
);

const testCorrupt = createMacro(
  (input: string, illegalChar: string) => {
    expect(() => parseChunks(input)).toThrow(
      expect.objectContaining({ illegalChar }),
    );
  },
  (provided, input) => `considers ${input || provided} corrupt`,
);

const makeChunk = (type: ChunkType, ...children: Chunk[]): Chunk => ({
  type,
  children,
});
const paren = partial(makeChunk, 'paren');
const square = partial(makeChunk, 'square');
const curly = partial(makeChunk, 'curly');
const angle = partial(makeChunk, 'angle');

run(testParse, '()', paren());
run(testParse, '[]', square());
run(testParse, '{}', curly());
run(testParse, '<>', angle());
run(testParse, '([])', paren(square()));
run(testParse, '{()()()}', curly(paren(), paren(), paren()));
run(testParse, '<([{}])>', angle(paren(square(curly()))));
run(
  testParse,
  '[<>({}){}[([])<>]]',
  square(angle(), paren(curly()), curly(), square(paren(square()), angle())),
);
run(
  testParse,
  '(((((((((())))))))))',
  paren(paren(paren(paren(paren(paren(paren(paren(paren(paren()))))))))),
);

run(testIncomplete, '(');
run(testIncomplete, '[{}');
run(testIncomplete, '<[(');
run(testIncomplete, '[]<>{');

run(testCorrupt, '(]', ']');
run(testCorrupt, '{()()()>', '>');
run(testCorrupt, '(((()))}', '}');
run(testCorrupt, '<([]){()}[{}])', ')');
