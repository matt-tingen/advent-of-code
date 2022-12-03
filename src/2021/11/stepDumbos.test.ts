import { Coords, toDigitGridString } from '~/util/grid';
import { isTruthy } from '~/util/isTruthy';
import { map2d } from '~/util/map2d';
import { parseDigitGrid } from './parse';
import { stepDumbos } from './stepDumbos';

const testGrid = createMacro(
  (initialGridString: string, expectedGridString: string) => {
    const expectedGrid = parseDigitGrid(expectedGridString.trim());
    const expectedFlashes = map2d(expectedGrid, (value, r, c) =>
      value === 0 ? ([r, c] as Coords) : null,
    )
      .flat()
      .filter(isTruthy);

    const [resultGrid, resultFlashes] = stepDumbos(
      parseDigitGrid(initialGridString.trim()),
    );
    const resultGridString = toDigitGridString(resultGrid);

    expect(resultGridString).toEqual(expectedGridString.trim());
    expect(resultFlashes).toIncludeSameMembers(expectedFlashes);
  },
  (provided, input, expected) => provided || `${input} steps to ${expected}`,
);

run(
  'incrementing',
  testGrid,
  `
12
34
`,
  `
23
45
`,
);

run(
  'single flash',
  testGrid,
  `
91
11
`,
  `
03
33
`,
);

run(
  'double flash',
  testGrid,
  `
91
19
`,
  `
04
40
`,
);

run(
  'cascaded flash',
  testGrid,
  `
91
18
`,
  `
04
40
`,
);

run(
  'flashing a 1',
  testGrid,
  `
11111
19991
19191
19991
11111
`,
  `
34543
40004
50005
40004
34543
`,
);

const providedExampleGrids = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526

6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637

8807476555
5089087054
8597889608
8485769600
8700908800
6600088989
6800005943
0000007456
9000000876
8700006848

0050900866
8500800575
9900000039
9700000041
9935080063
7712300000
7911250009
2211130000
0421125000
0021119000

2263031977
0923031697
0032221150
0041111163
0076191174
0053411122
0042361120
5532241122
1532247211
1132230211

4484144000
2044144000
2253333493
1152333274
1187303285
1164633233
1153472231
6643352233
2643358322
2243341322

5595255111
3155255222
3364444605
2263444496
2298414396
2275744344
2264583342
7754463344
3754469433
3354452433

6707366222
4377366333
4475555827
3496655709
3500625609
3509955566
3486694453
8865585555
4865580644
4465574644

7818477333
5488477444
5697666949
4608766830
4734946730
4740097688
6900007564
0000009666
8000004755
6800007755

9060000644
7800000976
6900000080
5840000082
5858000093
6962400000
8021250009
2221130009
9111128097
7911119976

0481112976
0031112009
0041112504
0081111406
0099111306
0093511233
0442361130
5532252350
0532250600
0032240000
`.split('\n\n');

const testProvidedExample = createMacro(
  (step: number) => {
    testGrid(providedExampleGrids[step - 1], providedExampleGrids[step]);
  },
  (provided, step) => `provided example step ${step}`,
);

run(testProvidedExample, 1);
run(testProvidedExample, 2);
run(testProvidedExample, 3);
run(testProvidedExample, 4);
run(testProvidedExample, 5);
run(testProvidedExample, 6);
run(testProvidedExample, 7);
run(testProvidedExample, 8);
run(testProvidedExample, 9);
run(testProvidedExample, 10);
