/* eslint-disable no-bitwise */
import { range } from 'lodash';
import { BitStream } from '../../util/BitStream';

interface BasePacket {
  version: number;
}

export interface ValuePacket extends BasePacket {
  value: number;
}

export interface OperatorPacket extends BasePacket {
  subPackets: Packet[];
}

export type Packet = OperatorPacket | ValuePacket;

export const parseBitsPacket = (stream: BitStream): Packet => {
  const version = stream.takeInt(3);
  const typeId = stream.takeInt(3);

  switch (typeId) {
    case 4:
      return {
        version,
        value: parseLiteralValue(stream),
      };

    default:
      return {
        version,
        subPackets: parseSubPackets(stream),
      };
  }
};

const parseLiteralValue = (stream: BitStream) => {
  let isDone = false;

  const chunks: number[] = [];

  for (let i = 0; !isDone; i += 4) {
    isDone = !stream.take();
    chunks.unshift(stream.takeInt(4));
  }

  return chunks.reduce((value, chunk, i) => value + (chunk << (i * 4)), 0);
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

  return subPackets;
};

const parseNumSubPackets = (stream: BitStream) => {
  const count = stream.takeInt(11);

  return range(count).map(() => parseBitsPacket(stream));
};
