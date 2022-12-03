import { a } from './a';
import { parseCaveEdges } from './parse';

const testA = createMacro(
  (input: string, expected: number) => {
    expect(a(parseCaveEdges(input.trim()))).toBe(expected);
  },
  (provided, input, expected) => `${provided || input} has ${expected} paths`,
);

run(
  'small cave',
  testA,
  `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`,
  10,
);

run(
  'medium cave',
  testA,
  `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`,
  19,
);

run(
  'large cave',
  testA,
  `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`,
  226,
);
