import { a } from './a';
import { parseStringLines } from './parse';

const testA = createMacro(
  (input: string, expected: number) => {
    expect(a(parseStringLines(input))).toBe(expected);
  },
  (provided, input, expected) =>
    `${provided || input} has total score ${expected}`,
);

run(
  'provided example',
  testA,
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
  26397,
);
