import { repeat } from 'lodash';
import { binToHex } from '../../util/binToHex';
import { BitStream } from '../../util/BitStream';
import { Packet, parseBitsPacket } from './parseBitsPacket';
import { literal, op } from './testUtils';

const testParse = createMacro(
  (bin: string, expected: Packet) => {
    const hex = binToHex(bin, true);
    const stream = new BitStream(hex);

    expect(parseBitsPacket(stream)).toEqual(expected);
  },
  (hint, bin) => `parses ${hint || bin}`,
);

const literal2021 = literal(6, 2021);

run('literal', testParse, '110100101111111000101000', literal2021);

const typeZeroLessThan = op(1, 'lessThan', literal(6, 10), literal(2, 20));

run(
  'type 0',
  testParse,
  '00111000000000000110111101000101001010010001001000000000',
  typeZeroLessThan,
);

const typeOneMax = op(
  7,
  'maximum',
  literal(2, 1),
  literal(4, 2),
  literal(1, 3),
);

run(
  'type 1',
  testParse,
  '11101110000000001101010000001100100000100011000001100000',
  typeOneMax,
);

const nestedContentsBin =
  // type 0
  '0011100000000000011011110100010100101001000100100' +
  // literal
  '110100101111111000101' +
  // type 0
  '0011100000000000011011110100010100101001000100100' +
  // type 1
  '111011100000000011010100000011001000001000110000011';
const nestedContents = [
  typeZeroLessThan,
  literal2021,
  typeZeroLessThan,
  typeOneMax,
];

run(
  'nested type 0',
  testParse,
  `1110000${nestedContentsBin.length
    .toString(2)
    .padStart(15, '0')}${nestedContentsBin}`,
  op(7, 'sum', ...nestedContents),
);

run(
  '80-bit literal',
  testParse,
  `000100${repeat('11111', 76 / 4)}01111`,
  literal(0, BigInt(`0b${repeat('1', 80)}`)),
);
