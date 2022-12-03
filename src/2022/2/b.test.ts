import { b } from './b';
import { GameStrategy } from './types';

const testB = createMacro(
  (values: GameStrategy[], expected: number) => {
    expect(b(values)).toBe(expected);
  },
  (provided, input, expected) =>
    provided || `score for ${JSON.stringify(input)} is ${expected}`,
);

run(
  testB,
  [
    ['A', 'Y'],
    ['B', 'X'],
    ['C', 'Z'],
  ],
  12,
);
