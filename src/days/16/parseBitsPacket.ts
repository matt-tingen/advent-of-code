import { range } from 'lodash';
import { BitStream } from '../../util/BitStream';

interface BasePacket {
  version: number;
}

export interface ValuePacket extends BasePacket {
  value: bigint;
}

export interface OperatorPacket extends BasePacket {
  operator: PacketOperator;
  subPackets: Packet[];
}

export type Packet = OperatorPacket | ValuePacket;
export type PacketOperator =
  | 'sum'
  | 'product'
  | 'minimum'
  | 'maximum'
  | 'greaterThan'
  | 'lessThan'
  | 'equalTo';

const operators: Record<number, PacketOperator> = {
  0: 'sum',
  1: 'product',
  2: 'minimum',
  3: 'maximum',
  5: 'greaterThan',
  6: 'lessThan',
  7: 'equalTo',
};

export const parseBitsPacket = (stream: BitStream): Packet => {
  const version = stream.takeInt(3);
  const typeId = stream.takeInt(3);

  return typeId === 4
    ? {
        version,
        value: parseLiteralValue(stream),
      }
    : {
        version,
        operator: operators[typeId],
        subPackets: parseSubPackets(stream),
      };
};

const parseLiteralValue = (stream: BitStream) => {
  let isDone = false;

  const chunks: number[] = [];

  for (let i = 0; !isDone; i += 4) {
    isDone = !stream.take();
    chunks.unshift(stream.takeInt(4));
  }

  const value = chunks.reduce(
    (value, chunk, i) => value + BigInt(chunk) * 2n ** (BigInt(i) * 4n),
    0n,
  );

  return value;
};

const parseSubPackets = (stream: BitStream) => {
  const lengthTypeId = stream.take();

  return lengthTypeId
    ? parseNumSubPackets(stream)
    : parseBitLengthSubPackets(stream);
};

const parseBitLengthSubPackets = (stream: BitStream) => {
  const bitLength = stream.takeInt(15);
  const end = stream.index + bitLength;
  const subPackets: Packet[] = [];

  while (stream.index < end) {
    subPackets.push(parseBitsPacket(stream));
  }

  if (stream.index !== end)
    throw new Error('Sub-packets length exceeded prescribed size');

  return subPackets;
};

const parseNumSubPackets = (stream: BitStream) => {
  const count = stream.takeInt(11);

  return range(count).map(() => parseBitsPacket(stream));
};
