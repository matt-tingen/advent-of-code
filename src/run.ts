/* eslint-disable @typescript-eslint/no-var-requires, import/no-dynamic-require, global-require */
import { promises as fs } from 'fs';
import path from 'path';
import _ from 'lodash';
import { MaybePromise } from './types';

type Solver = (input: string) => MaybePromise<string | number>;

const YEARS_DIR = __dirname;

const getInput = async (dir: string) => {
  const buffer = await fs.readFile(path.join(dir, 'input.txt'));

  return buffer.toString().trim();
};

const isDirectory = async (source: string) => {
  const stats = await fs.lstat(source);

  return stats.isDirectory();
};

const getDirectories = async (source: string) => {
  const dirs = await fs.readdir(source);

  return dirs
    .map((name) => path.join(source, name))
    .filter(isDirectory)
    .map((dir) => path.basename(dir));
};

const getLatestDirNumerically = async (parentDir: string) => {
  const dirs = await getDirectories(parentDir);

  if (!dirs.length) {
    throw new Error('No directories found');
  }

  const numericDirs = dirs
    .map(_.unary(parseInt))
    .filter(_.negate(Number.isNaN));
  const dir = _.maxBy(numericDirs);

  return dir?.toString();
};

export const SOLUTIONS_FILENAME = 'index.ts';
const PART_EXPORT_NAMES = ['b', 'a'];

const getLatestPart = async (dayDir: string) => {
  const filename = path.join(dayDir, SOLUTIONS_FILENAME);

  const solutions = require(filename) as unknown;
  const solutionsExports = new Set(
    (typeof solutions === 'object' && solutions && Object.keys(solutions)) ||
      [],
  );

  const latest = PART_EXPORT_NAMES.find((part) => solutionsExports.has(part));

  return latest;
};

export const getLatestChallenge = async (
  yearArg?: string,
  dayArg?: string,
  partArg?: string,
) => {
  const year = yearArg || (await getLatestDirNumerically(YEARS_DIR));

  if (!year) {
    throw new Error('Missing year');
  }

  const yearDir = path.join(YEARS_DIR, year);
  const day = dayArg || (await getLatestDirNumerically(yearDir));

  if (!day) {
    throw new Error('Missing day');
  }

  const dayDir = path.join(yearDir, day);
  const part = partArg || (await getLatestPart(dayDir));

  if (!part) {
    throw new Error('Missing part');
  }

  return [year, day, part] as [string, string, string];
};

const getNextDay = async () => {
  const [yearString, dayString] = await getLatestChallenge();

  const day = (parseInt(dayString, 10) + 1) % 25;
  const year = parseInt(yearString, 10) + (day === 1 ? 1 : 0);

  return [year, day] as const;
};

export const getNextSolutionsFilePath = async () => {
  const [year, day] = await getNextDay();

  const yearDir = path.join(YEARS_DIR, year.toString());
  const dayDir = path.join(yearDir, day.toString());
  const solutionsPath = path.join(dayDir, SOLUTIONS_FILENAME);

  return solutionsPath;
};

export const getSolver = async (
  year: string | number,
  day: string | number,
  part: string,
) => {
  const yearDir = path.join(YEARS_DIR, year.toString());
  const dayDir = path.join(yearDir, day.toString());
  const solutionsPath = path.join(dayDir, SOLUTIONS_FILENAME);

  const solve = require(solutionsPath)[part] as Solver;

  const input = await getInput(dayDir);

  return () => solve(input);
};
