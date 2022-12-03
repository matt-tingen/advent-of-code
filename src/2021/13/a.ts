import { foldTransparency } from './foldTransparency';
import { FoldingInstructions } from './parse';

export const a = ({ dots, folds: [fold] }: FoldingInstructions) =>
  foldTransparency(dots, fold).length;
