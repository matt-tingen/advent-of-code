import { a } from './a';
import { parse } from './parse';

const testA = createMacro(
  (text: string, expected: number) => {
    expect(a(parse(text.trim()))).toBe(expected);
  },
  (provided, input, expected) =>
    provided || `sum of possible game IDs is ${expected}`,
);

run(
  testA,
  `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
  8,
);
