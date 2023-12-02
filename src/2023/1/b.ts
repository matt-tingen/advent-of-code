import { sum } from 'lodash';
import { reverseString } from '~/util/reverseString';

const digits = [
  '\\d',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];
const reverseDigits = ['\\d', ...digits.slice(1).map((d) => reverseString(d))];

const forwardsRegex = new RegExp(digits.join('|'), 'g');
const reverseRegex = new RegExp(reverseDigits.join('|'), 'g');

const parseDigit = (value: string) =>
  value.length === 1 ? parseInt(value, 10) : digits.indexOf(value);

export const b = (lines: string[]) => {
  const values = lines.map((line) => {
    const [first] = line.match(forwardsRegex)!;
    const [last] = reverseString(line).match(reverseRegex)!;

    return parseDigit(first) * 10 + parseDigit(reverseString(last));
  });

  return sum(values);
};
