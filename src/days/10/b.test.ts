import { b } from './b';
import { parseStringLines } from './parse';

const testB = createMacro(
  (input: string, expected: number) => {
    expect(b(parseStringLines(input))).toBe(expected);
  },
  (provided, input, expected) =>
    `${provided || input} has middle score ${expected}`,
);

run(
  'provided example',
  testB,
  `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`.trim(),
  288957,
);
