import { BitStream } from '~/util/BitStream';
import { evaluatePacket } from './evaluatePacket';
import { parseBitsPacket } from './parseBitsPacket';

export const b = (stream: BitStream) => {
  const packet = parseBitsPacket(stream);

  return evaluatePacket(packet);
};
