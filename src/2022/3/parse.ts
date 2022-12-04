import { ArrayItem } from '~/types';

export type Input = ReturnType<typeof parse>;
export type Rucksack = ArrayItem<Input>;

export const parse = (text: string) =>
  text
    .split('\n')
    .map(
      (line) =>
        [line.slice(0, line.length / 2), line.slice(line.length / 2)] as const,
    );
