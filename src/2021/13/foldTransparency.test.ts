import { Dot, Fold, foldTransparency } from './foldTransparency';

const testFold = createMacro(
  (dots: Dot[], fold: Fold, expected: Dot[]) => {
    expect(foldTransparency(dots, fold)).toIncludeSameMembers(expected);
  },
  (provided, dots, fold, expected) =>
    provided || `folding ${fold} with dots ${dots} returns ${expected}`,
);

run('min x', testFold, [{ x: 2, y: 0 }], { direction: 'x', axis: 1 }, [
  { x: 0, y: 0 },
]);
run('min y', testFold, [{ x: 0, y: 2 }], { direction: 'y', axis: 1 }, [
  { x: 0, y: 0 },
]);
run('simple x', testFold, [{ x: 19, y: 0 }], { direction: 'x', axis: 13 }, [
  { x: 7, y: 0 },
]);
run(
  'overlap',
  testFold,
  [
    { x: 0, y: 0 },
    { x: 0, y: 2 },
  ],
  { direction: 'y', axis: 1 },
  [{ x: 0, y: 0 }],
);
