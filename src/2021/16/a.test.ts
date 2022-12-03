import { BitStream } from '~/util/BitStream';
import { a } from './a';

const testA = createMacro(
  (hex: string, expected: number) => {
    const stream = new BitStream(hex);

    expect(a(stream)).toBe(expected);
  },
  (hint, hex, expected) => `${hint || hex} has versions sum ${expected}`,
);

run(testA, '8A004A801A8002F478', 16);
run(testA, '620080001611562C8802118E34', 12);
run(testA, 'C0015000016115A2E0802F182340', 23);
run(testA, 'A0016C880162017C3686B18A3D4780', 31);
