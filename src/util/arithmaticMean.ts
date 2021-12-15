import { sum } from 'lodash';

export const arithmaticMean = (values: number[]) => sum(values) / values.length;
