import { BitStream } from '~/util/BitStream';
import { b } from './b';

const testB = createMacro(
  (hex: string, value: bigint | number) => {
    const stream = new BitStream(hex);

    expect(b(stream)).toBe(BigInt(value));
  },
  (hint, hex, value) => `evaluates ${hint || hex} as ${value}`,
);

run('1 + 2', testB, 'C200B40A82', 3);
run('6 * 9', testB, '04005AC33890', 54);
run('min(7, 8, 9)', testB, '880086C3E88112', 7);
run('max(7, 8, 9)', testB, 'CE00C43D881120', 9);
run('5 < 15', testB, 'D8005AC2A8F0', 1);
run('5 !> 15', testB, 'F600BC2D8F', 0);
run('5 !== 15', testB, '9C005AC2F8F0', 0);
run('1 + 3 = 2 * 2', testB, '9C0141080250320F1802104A08', 1);

run(testB, 'A0016C880162017C3686B18A3D4780', 54);
run(testB, 'E002A8E001BD14A449A5FC538006F45291277006A0641183', 2026);
