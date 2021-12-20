/* eslint-disable no-bitwise */
import { chunk } from 'lodash';

export const binToHex = (bin: string, padEnd = false) => {
  const hexChars: string[] = [];
  const pad = padEnd ? bin.padEnd : bin.padStart;
  const paddedBin = pad.call(
    bin,
    bin.length + (4 - (bin.length % 4 || 4)),
    '0',
  );

  chunk(paddedBin, 4).forEach((bits) => {
    let int = 0;

    for (let i = 0; i < 4; i++) {
      const bit = bits[i] === '0' ? 0 : 1;

      int += bit << (3 - i);
    }

    hexChars.push(int.toString(16));
  });

  return hexChars.join('').toUpperCase();
};
