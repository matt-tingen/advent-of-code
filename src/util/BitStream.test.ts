import { BitStream } from './BitStream';

const testTakeInt = createMacro(
  (hex: string, bits: number, expected: number) => {
    const stream = new BitStream(hex);

    expect(stream.takeInt(bits)).toBe(expected);
  },
  (hint, hex, bits, expected) =>
    `returns ${expected} when taking a ${bits}-bit int from ${hex}`,
);

run(testTakeInt, '0', 4, 0x0);
run(testTakeInt, '1', 3, 0x0);
run(testTakeInt, '1', 4, 0x1);
run(testTakeInt, '8', 4, 0x8);
run(testTakeInt, 'F', 4, 0xf);
