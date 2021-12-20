import { binToHex } from './binToHex';

const testConversion = createMacro(
  (bin: string, padEnd: boolean, hex: string) => {
    expect(binToHex(bin, padEnd)).toBe(hex);
  },
  (hint, bin, padEnd, hex) => hint || `${bin} converts to ${hex}`,
);

run(testConversion, '0', false, '0');
run(testConversion, '0000', false, '0');
run(testConversion, '00000', false, '00');
run(testConversion, '1', false, '1');
run(testConversion, '0001', false, '1');
run(testConversion, '10001', false, '11');
run(testConversion, '1111', false, 'F');
run(
  testConversion,
  '1111111111111111111111111111111111111111',
  false,
  'FFFFFFFFFF',
);
run(
  testConversion,
  '0111111111111111111111111111111111111111',
  false,
  '7FFFFFFFFF',
);
run(
  testConversion,
  '111111111111111111111111111111111111111',
  false,
  '7FFFFFFFFF',
);

run(
  testConversion,
  '00111000000000000110111101000101001010010001001000000000',
  false,
  '38006F45291200',
);
run(
  testConversion,
  '00111000000000000110111101000101001010010001001000000',
  true,
  '38006F45291200',
);
