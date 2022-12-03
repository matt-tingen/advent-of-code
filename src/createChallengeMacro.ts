import { getSolver } from '~/run';

export const createChallengeMacro = (year: number) =>
  createMacro(
    async (day: number, part: 'a' | 'b') => {
      const solver = await getSolver(year, day, part);
      const result = await solver();

      expect(result).toMatchSnapshot();
    },
    (provided, day, part) => provided || `Challenge ${year} ${day}${part}`,
  );
