import { findCheapestPath } from './findCheapestPath';

it('paths a trivial graph', () => {
  const start = 'start';
  const goal = 'goal';

  expect(
    findCheapestPath(
      start,
      goal,
      (node) => (node === start ? [goal] : [start]),
      () => 1,
      () => 1,
    ),
  ).toEqual([start, goal]);
});
