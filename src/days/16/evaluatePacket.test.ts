import { partial } from 'lodash';
import { evaluatePacket } from './evaluatePacket';
import { Packet } from './parseBitsPacket';
import { literal as literal_, op as op_ } from './testUtils';

const testEval = (packet: Packet, value: bigint | number) => {
  expect(evaluatePacket(packet)).toBe(BigInt(value));
};

const literal = partial(literal_, 0);
const op = partial(op_, 0);

const deepNarrow = op(
  'sum',
  op('product', op('minimum', op('minimum', op('maximum', literal(22))))),
);

run('deep and narrow', testEval, deepNarrow, 22);

const deepWide = op(
  'greaterThan',
  deepNarrow,
  op(
    'product',
    op('lessThan', literal(200), literal(125453)),
    op('sum', literal(2342)),
  ),
);

run('deep and wide', testEval, deepWide, 0);
