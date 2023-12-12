import dedent from 'dedent';
import { a } from '.';

const input = dedent`
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;

it('solves provided a', () => {
  expect(a(input)).toBe(2);
});
