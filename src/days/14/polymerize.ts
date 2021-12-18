import { PolymerizationRules } from './parse';

interface Insertion {
  element: string;
  i: number;
}

export const polymerize = (polymer: string, rules: PolymerizationRules) => {
  const elements = polymer.split('');
  const insertions: Insertion[] = [];

  for (let i = 0; i < elements.length - 1; i++) {
    const pair = elements[i] + elements[i + 1];
    const result = rules[pair];

    if (result) {
      insertions.push({ element: result, i: i + insertions.length + 1 });
    }
  }

  insertions.forEach(({ element, i }) => {
    elements.splice(i, 0, element);
  });

  return elements.join('');
};
