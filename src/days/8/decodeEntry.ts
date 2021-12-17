import { intersection as arrayIntersection, partition, without } from 'lodash';
import { DisplayEntry } from './parse';

const allWires = 'abcdefg'.split('');

const normalizeWires = (wires: string) => wires.split('').sort().join('');

const intersection = (...strings: string[]) =>
  arrayIntersection(...strings.map((string) => string.split('')));

export const decodeEntry = (entry: DisplayEntry) => {
  const findWiresBySegmentCount = (n: number) =>
    entry.inputs.filter((wires) => wires.length === n).map(normalizeWires);

  const [oneWires] = findWiresBySegmentCount(2);
  const [fourWires] = findWiresBySegmentCount(4);
  const [sevenWires] = findWiresBySegmentCount(3);
  const [eightWires] = findWiresBySegmentCount(7);
  const sizeFiveWires = findWiresBySegmentCount(5);
  const sizeSixWires = findWiresBySegmentCount(6);

  // The only segment lit for a 7 but not a 1 is A.
  const [a] = without(sevenWires.split(''), ...oneWires.split(''));

  // The only segments that all five and six segment digits (0, 2, 3, 5, 6, 9) have in common are A and G.
  const [g] = without(intersection(...sizeFiveWires, ...sizeSixWires), a);

  // The only unlit segments in 4 are A, G, and E.
  const [e] = without(allWires, ...fourWires, a, g);

  // The only segments that all five segment digits (2, 3, 5) have in common are A, D, and G.
  const [d] = without(intersection(...sizeFiveWires), a, g);

  // The only digits all six segment digits (0, 6, 9) have in common are A, B,
  // F, and G. F is known to be in 1 (along with C which is irrelevent here).
  const [b] = without(intersection(...sizeSixWires), ...oneWires, a, g);

  // Only C and F remain to be differentiated. Among the
  // five segment digits (2, 3, 5), 3 can be ignored because it has both C and F
  // lit. Between 2 and 5, B implies (F and not C).
  const cf = oneWires.split('');
  const [[threeWires], twoAndFiveWires] = partition(sizeFiveWires, (wires) =>
    cf.every((wire) => wires.includes(wire)),
  );
  const [[fiveWires], [twoWires]] = partition(twoAndFiveWires, (wires) =>
    wires.includes(b),
  );
  const [f] = without(fiveWires.split(''), a, b, d, g);
  const [c] = without(cf, f);

  const wiresToDigit: Partial<Record<string, number>> = {
    [normalizeWires(a + b + c + e + f + g)]: 0,
    [oneWires]: 1,
    [twoWires]: 2,
    [threeWires]: 3,
    [fourWires]: 4,
    [fiveWires]: 5,
    [normalizeWires(a + b + d + e + f + g)]: 6,
    [sevenWires]: 7,
    [eightWires]: 8,
    [normalizeWires(a + b + c + d + f + g)]: 9,
  };

  const digits = entry.output.map(
    (digitWires) => wiresToDigit[normalizeWires(digitWires)]!,
  );

  return digits;
};
