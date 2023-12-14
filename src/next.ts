import fs from 'fs/promises';
import path from 'path';
import dedent from 'dedent';
import { getNextSolutionsFilePath } from './run';

const solutionTemplate = dedent`
  import { flow } from 'lodash';

  const parse = (input: string) => {
    //
  };

  export const a = flow(parse, (value) => {
    //
  });`;

const main = async () => {
  const solutionsPath = await getNextSolutionsFilePath();
  const dayPath = path.dirname(solutionsPath);

  await fs.mkdir(dayPath, { recursive: true });
  await fs.writeFile(solutionsPath, `${solutionTemplate}\n`);
  await fs.writeFile(path.join(dayPath, 'input.txt'), '');
};

main();
