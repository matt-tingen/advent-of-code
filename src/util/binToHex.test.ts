import { binToHex } from './binToHex';

const testConversion = createMacro(
  (bin: string, hex: string) => {
    expect(binToHex(bin)).toBe(hex);
  },
  (hint, bin, hex) => hint || `${bin} converts to ${hex}`,
);

run(testConversion, '0', '0');
run(testConversion, '0000', '0');
run(testConversion, '00000', '00');
run(testConversion, '1', '1');
run(testConversion, '0001', '1');
run(testConversion, '10001', '11');
run(testConversion, '1111', 'F');
run(testConversion, '1111111111111111111111111111111111111111', 'FFFFFFFFFF');
run(testConversion, '0111111111111111111111111111111111111111', '7FFFFFFFFF');
run(testConversion, '111111111111111111111111111111111111111', '7FFFFFFFFF');
