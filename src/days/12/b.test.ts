import { b } from './b';
import { parseCaveEdges } from './parse';

const testB = createMacro(
  (input: string, expected: number) => {
    expect(b(parseCaveEdges(input.trim()))).toBe(expected);
  },
  (provided, input, expected) => `${provided || input} has ${expected} paths`,
);

run(
  'small cave',
  testB,
  `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`,
  36,
);

run(
  'medium cave',
  testB,
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
  103,
);

run(
  'large cave',
  testB,
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
  3509,
);
