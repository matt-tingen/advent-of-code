export type DisplayOutput = [string, string, string, string];

export interface DisplayEntry {
  inputs: string[];
  output: DisplayOutput;
}

export const parseSevenSegmentDisplayEntries = (input: string) =>
  input.split('\n').map((line): DisplayEntry => {
    const [a, b] = line.split(' | ');

    return {
      inputs: a.split(' '),
      output: b.split(' ') as DisplayOutput,
    };
  });
