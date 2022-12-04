import dedent from 'dedent';
import { a } from './a';
import { parse } from './parse';

const testA = createMacro(
  (text: string, expected: number) => {
    expect(a(parse(text))).toBe(expected);
  },
  (provided, input, expected) =>
    provided ||
    `sum of priorities of ${input.split('\n')[0]}... is ${expected}`,
);

run(
  testA,
  dedent`
  vJrwpWtwJgWrhcsFMMfFFhFp
  jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
  PmmdzqPrVvPwwTWBwg
  wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
  ttgJtRGJQctTZtZT
  CrZsJsPPZsGzwwsLwLmpwMDw`,
  157,
);
