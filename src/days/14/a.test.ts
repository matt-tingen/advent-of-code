import { a } from './a';
import { parsePolymerizationInstructions } from './parse';

it('provided example', () => {
  expect(
    a(
      parsePolymerizationInstructions(
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
      ),
    ),
  ).toBe(1588);
});
