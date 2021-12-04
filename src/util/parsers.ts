import _ from 'lodash';

export const parseIntLines = (string: string) =>
  string.split('\n').map(_.unary(parseInt));

export const parseIntCsv = (string: string) =>
  string.split(',').map(_.unary(parseInt));
