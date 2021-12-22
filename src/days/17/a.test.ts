import { a } from './a';
import { parseTargetArea } from './parse';

const testA = createMacro(
  (input: string, expected: number) => {
    expect(a(parseTargetArea(input))).toBe(expected);
  },
  (hint, input, expected) => `highest Y for ${hint || input} is ${expected}`,
);

run('provided example', testA, 'x=20..30, y=-10..-5', 45);
