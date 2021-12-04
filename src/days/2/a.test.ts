import { a } from './a';
import { parse } from './parse';

const testA = createMacro(
  (commands: string, expected: number) => {
    expect(a(parse(commands))).toBe(expected);
  },
  (provided, input, expected) =>
    provided || `${input} has ${expected} increases`,
);

run(
  testA,
  `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`.trim(),
  150,
);
