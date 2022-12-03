import { foldTransparency } from './foldTransparency';
import { FoldingInstructions } from './parse';
import { stringifyDots } from './stringifyDots';

export const a = ({ dots: initialDots, folds }: FoldingInstructions) => {
  const dots = folds.reduce(foldTransparency, initialDots);
  const dotGrid = stringifyDots(dots);

  return dotGrid;
};
