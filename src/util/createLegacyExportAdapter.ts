/* eslint-disable import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires */
import path from 'path';
import { flow } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSoleExport = (module: any) => {
  const keys = Object.keys(module);

  if (keys.length === 0) {
    throw new Error('Expected a single export, found none');
  }

  if (keys.length > 1) {
    throw new Error(`Expected a single export, found: ${keys.join(',')}`);
  }

  return module[keys[0]];
};

const getParser = (dir: string): ((input: string) => unknown) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let module: any;

  try {
    module = require(path.join(dir, 'parse.ts'));
  } catch (e) {
    return (input) => input;
  }

  return getSoleExport(module);
};

export const createLegacyExportAdapter = (dirName: string) => {
  const a = getSoleExport(require(path.resolve(dirName, './a')));
  const parse = getParser(dirName);

  const solutions: { a: unknown; b?: unknown } = {
    a: flow(parse, a),
  };

  try {
    const b = getSoleExport(require(path.resolve(dirName, './b')));

    solutions.b = flow(parse, b);
  } catch {
    // noop
  }

  return solutions;
};
