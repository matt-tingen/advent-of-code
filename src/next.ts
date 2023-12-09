import fs from 'fs/promises';
import path from 'path';
import { getNextSolutionsFilePath } from './run';

const main = async () => {
  const solutionsPath = await getNextSolutionsFilePath();
  const dayPath = path.dirname(solutionsPath);

  await fs.mkdir(dayPath, { recursive: true });
  await fs.writeFile(solutionsPath, '');
  await fs.writeFile(path.join(dayPath, 'input.txt'), '');
};

main();
