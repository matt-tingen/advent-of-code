import { getElementCountDifference } from './getElementCountDifference';
import { parsePolymerizationInstructions } from './parse';

const testProvidedExample = createMacro(
  (steps: number, expected: number) => {
    const instructions = parsePolymerizationInstructions(
      `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`.trim(),
    );

    expect(getElementCountDifference(steps)(instructions)).toBe(expected);
  },
  (provided, steps, expected) =>
    `after ${steps} steps, has difference ${expected}`,
);

run(testProvidedExample, 10, 1588);
run(testProvidedExample, 40, 2188189693529);
