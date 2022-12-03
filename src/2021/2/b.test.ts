import { b } from './b';
import { parse } from './parse';

const testB = createMacro(
  (commands: string, expected: number) => {
    expect(b(parse(commands))).toBe(expected);
  },
  (provided, input, expected) =>
    provided || `${input} has ${expected} increases`,
);

run(
  testB,
  `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`.trim(),
  900,
);
