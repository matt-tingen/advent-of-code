export type PolymerizationRules = Record<string, string>;
export interface PolymerizationInstructions {
  template: string;
  rules: PolymerizationRules;
}

export const parsePolymerizationInstructions = (
  input: string,
): PolymerizationInstructions => {
  const [template, rulesString] = input.split('\n\n');
  const rules = Object.fromEntries(
    rulesString.split('\n').map((line) => {
      const [trigger, result] = line.split(' -> ');

      return [trigger, result];
    }),
  );

  return { template, rules };
};
