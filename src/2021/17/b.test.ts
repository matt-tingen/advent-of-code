import { b } from './b';
import { parseTargetArea } from './parse';

const testB = createMacro(
  (input: string, expected: number) => {
    expect(b(parseTargetArea(input))).toEqual(expected);
  },
  (hint, input, expected) =>
    `Number of v0 which hit the target for ${hint || input} is ${expected}`,
);

run('provided example', testB, 'x=20..30, y=-10..-5', 112);
