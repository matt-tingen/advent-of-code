import { a } from './a';
import { parseFoldingInstructions } from './parse';

const testA = createMacro(
  (input: string, expected: number) => {
    expect(a(parseFoldingInstructions(input.trim()))).toBe(expected);
  },
  (provided, input, expected) =>
    `${provided || input} has ${expected} dots after first fold`,
);

run(
  'provided example',
  testA,
  `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`,
  17,
);
