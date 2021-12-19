/* eslint-disable no-bitwise */
import { range } from 'lodash';

export class BitStream {
  private static nibbleBitMasks = range(3, -1, -1).map((i) => 1 << i);
  private hexChars: string[];
  private unusedBits: number[] = [];
  private bitsConsumed = 0;

  constructor(hex: string) {
    this.hexChars = hex.split('');
  }

  private parseBits() {
    const hex = this.hexChars.shift();

    if (!hex) return;
    const int = parseInt(hex, 16);
    const bits = BitStream.nibbleBitMasks.map((mask) => (int & mask ? 1 : 0));

    this.unusedBits.push(...bits);
  }

  take() {
    if (!this.unusedBits.length) {
      this.parseBits();
    }

    const bit = this.unusedBits.shift();

    if (bit === undefined) throw new Error('BitStream is empty');

    this.bitsConsumed++;

    return bit;
  }

  takeInt(bits: number) {
    let int = 0;

    for (let i = bits - 1; i >= 0; i--) {
      int += this.take() << i;
    }

    return int;
  }

  get index() {
    return this.bitsConsumed;
  }
}
