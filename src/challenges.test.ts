import { getSolver } from './run';

const testChallenge = createMacro(
  async (day: number, part: 'a' | 'b') => {
    const solver = await getSolver(day, part);
    const result = await solver();

    expect(result).toMatchSnapshot();
  },
  (provided, day, part) => provided || `Challenge ${day}${part}`,
);

run(testChallenge, 1, 'a');
