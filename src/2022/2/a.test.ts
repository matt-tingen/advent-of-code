import { a } from './a';
import { GameStrategy } from './types';

const testA = createMacro(
  (values: GameStrategy[], expected: number) => {
    expect(a(values)).toBe(expected);
  },
  (provided, input, expected) =>
    provided || `score for ${JSON.stringify(input)} is ${expected}`,
);

run(
  testA,
  [
    ['A', 'Y'],
    ['B', 'X'],
    ['C', 'Z'],
  ],
  15,
);
