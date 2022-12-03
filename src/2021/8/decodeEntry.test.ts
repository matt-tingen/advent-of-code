import { decodeEntry } from './decodeEntry';
import { parseSevenSegmentDisplayEntries } from './parse';

const testDecode = createMacro(
  (input: string, expected: number[]) => {
    const [entry] = parseSevenSegmentDisplayEntries(input);

    expect(decodeEntry(entry)).toEqual(expected);
  },
  (provided, input, expected) =>
    `${provided || input} has output digits ${expected}`,
);

run(
  'non-scrambled',
  testDecode,
  'abcefg cf acdeg acdfg bcdf abdfg abdefg acf abcdefg abcdfg | abcdfg acf acdfg abdfg',
  [9, 7, 3, 5],
);

run(
  testDecode,
  'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf',
  [5, 3, 5, 3],
);

run(
  testDecode,
  'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
  [8, 3, 9, 4],
);
run(
  testDecode,
  'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
  [9, 7, 8, 1],
);
run(
  testDecode,
  'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
  [1, 1, 9, 7],
);
run(
  testDecode,
  'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
  [9, 3, 6, 1],
);
run(
  testDecode,
  'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
  [4, 8, 7, 3],
);
run(
  testDecode,
  'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
  [8, 4, 1, 8],
);
run(
  testDecode,
  'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
  [4, 5, 4, 8],
);
run(
  testDecode,
  'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
  [1, 6, 2, 5],
);
run(
  testDecode,
  'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
  [8, 7, 1, 7],
);
run(
  testDecode,
  'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce',
  [4, 3, 1, 5],
);
