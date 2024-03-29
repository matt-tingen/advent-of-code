import { flow, keyBy } from 'lodash';
import { leastCommonMultiple } from '~/util/leastCommonMultiple';

const parse = (input: string) => {
  const [turns, nodeLines] = input.split('\n\n');

  const nodes = nodeLines.split('\n').map((line) => {
    const [id, left, right] = Array.from(line.matchAll(/\w+/g)).map(
      (m) => m[0],
    );

    return { id, left, right };
  });

  return {
    turns: turns.split('').map((turn) => (turn === 'L' ? 'left' : 'right')),
    nodes,
  };
};

export const a = flow(parse, ({ turns, nodes }) => {
  const nodesById = keyBy(nodes, (node) => node.id);

  let turnIndex = 0;
  let node = nodesById['AAA'];

  while (node.id !== 'ZZZ') {
    const turn = turns[turnIndex % turns.length];

    node = nodesById[node[turn]];
    turnIndex++;
  }

  return turnIndex;
});

export const b = flow(parse, ({ turns, nodes }) => {
  const nodesById = keyBy(nodes, (node) => node.id);

  const startNodes = nodes.filter((node) => node.id.endsWith('A'));

  const pathCycleLengths = startNodes.map((startNode) => {
    let turnIndex = 0;
    let node = startNode;

    while (!node.id.endsWith('Z')) {
      const turn = turns[turnIndex % turns.length];

      node = nodesById[node[turn]];
      turnIndex++;
    }

    return turnIndex;
  });

  return leastCommonMultiple(pathCycleLengths);
});
