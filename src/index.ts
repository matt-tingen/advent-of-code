/* eslint-disable no-console */
import clipboard from 'clipboardy';
import { getLatestChallenge, getSolver } from './run';

const specifierRegex = /^(\d+)([ab]?)$/;

const processArgs = (args: (string | undefined)[]) => {
  const [a, b] = args;
  const year = a?.length === 4 ? a : undefined;
  const specifier = year ? b : a;

  const match = specifier && specifier.match(specifierRegex);

  if (specifier && !match) {
    throw new Error('Invalid specifier');
  }

  const [day, part] = match ? match.slice(1) : ([] as (string | undefined)[]);

  return [year, day, part] as const;
};

const main = async () => {
  const args = processArgs(process.argv.slice(2));
  const [year, day, part] = await getLatestChallenge(...args);
  const solver = await getSolver(year, day, part);

  console.time('solve');
  const result = await solver();

  console.timeEnd('solve');

  await clipboard.write(result.toString());
  console.log(`Result for ${year} ${day}${part} (copied to clipboard)`);
  console.log(result);
};

main();
