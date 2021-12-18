import { PolymerizationRules } from './parse';
import { polymerize } from './polymerize';

const testPolymerize = createMacro(
  (elements: string, rules: PolymerizationRules, expected: string) => {
    expect(polymerize(elements, rules)).toBe(expected);
  },
  (provided, elements, rules, expected) =>
    provided || `polymerizes ${elements} into ${expected}`,
);

run('no rules', testPolymerize, 'AB', {}, 'AB');
run('single insertion', testPolymerize, 'AB', { AB: 'Z' }, 'AZB');
run(
  'disjoint insertions',
  testPolymerize,
  'ABCD',
  { AB: 'Z', CD: 'Y' },
  'AZBCYD',
);
run(
  'adjacent insertions',
  testPolymerize,
  'ABC',
  { AB: 'Z', BC: 'Y' },
  'AZBYC',
);

const providedExampleSteps = [
  'NNCB',
  'NCNBCHB',
  'NBCCNBBBCBHCB',
  'NBBBCNCCNBBNBNBBCHBHHBCHB',
  'NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB',
];

const providedExampleRules: PolymerizationRules = {
  CH: 'B',
  HH: 'N',
  CB: 'H',
  NH: 'C',
  HB: 'C',
  HC: 'B',
  HN: 'C',
  NN: 'C',
  BH: 'H',
  NC: 'B',
  NB: 'B',
  BN: 'B',
  BB: 'N',
  BC: 'B',
  CC: 'N',
  CN: 'C',
};

const testProvidedExample = createMacro(
  (step: number) => {
    expect(
      polymerize(providedExampleSteps[step - 1], providedExampleRules),
    ).toBe(providedExampleSteps[step]);
  },
  (provided, step) => `provided example step ${step}`,
);

run(testProvidedExample, 1);
run(testProvidedExample, 2);
run(testProvidedExample, 3);
run(testProvidedExample, 4);
