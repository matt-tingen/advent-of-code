import {
  OperatorPacket,
  Packet,
  PacketOperator,
  ValuePacket,
} from './parseBitsPacket';

export const op = (
  version: number,
  operator: PacketOperator,
  ...subPackets: Packet[]
): OperatorPacket => ({
  version,
  operator,
  subPackets,
});
export const literal = (
  version: number,
  value: number | bigint,
): ValuePacket => ({
  version,
  value: BigInt(value),
});
