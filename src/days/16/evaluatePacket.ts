import { max, min } from 'lodash';
import { Packet } from './parseBitsPacket';

export const evaluatePacket = (packet: Packet): bigint => {
  if ('value' in packet) return packet.value;

  const { subPackets, operator } = packet;
  const values = subPackets.map(evaluatePacket);
  const [a, b] = values;

  switch (operator) {
    case 'sum':
      return values.reduce((product, value) => product + value, 0n);
    case 'product':
      return values.reduce((product, value) => product * value, 1n);
    case 'minimum':
      return min(values)!;
    case 'maximum':
      return max(values)!;
    case 'greaterThan':
      return a > b ? 1n : 0n;
    case 'lessThan':
      return a < b ? 1n : 0n;
    case 'equalTo':
      return a === b ? 1n : 0n;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
};
