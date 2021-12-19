import { binToHex } from '../../util/binToHex';
import { BitStream } from '../../util/BitStream';
import {
  OperatorPacket,
  Packet,
  parseBitsPacket,
  ValuePacket,
} from './parseBitsPacket';

const testParse = createMacro(
  (bin: string, expected: Packet) => {
    const hex = binToHex(bin);
    const stream = new BitStream(hex);

    expect(parseBitsPacket(stream)).toEqual(expected);
  },
  (hint, bin) => `parses ${hint || bin}`,
);

const op = (version: number, ...subPackets: Packet[]): OperatorPacket => ({
  version,
  subPackets,
});
const literal = (version: number, value: number): ValuePacket => ({
  version,
  value,
});

run('literal', testParse, '110100101111111000101000', literal(6, 2021));
run(
  'type 0',
  testParse,
  '00111000000000000110111101000101001010010001001000000000',
  op(1, literal(6, 10), literal(2, 20)),
);
run(
  'type 1',
  testParse,
  '11101110000000001101010000001100100000100011000001100000',
  op(7, literal(2, 1), literal(4, 2), literal(1, 3)),
);
