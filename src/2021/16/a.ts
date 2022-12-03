import { sumBy } from 'lodash';
import { BitStream } from '~/util/BitStream';
import { parseBitsPacket } from './parseBitsPacket';

export const a = (stream: BitStream) => {
  const packet = parseBitsPacket(stream);

  let versionsSum = 0;

  let packets = [packet];

  while (packets.length) {
    versionsSum += sumBy(packets, (p) => p.version);
    packets = packets.flatMap((p) => ('subPackets' in p ? p.subPackets : []));
  }

  return versionsSum;
};
