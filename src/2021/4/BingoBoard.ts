import chalk from 'chalk';
import { sum } from 'lodash';
import { Immutable } from '../../util/Immutable';
import { map2d } from '../../util/map2d';

export class BingoBoard {
  private complete = false;
  private valueCoords: Map<number, readonly [number, number]>;
  private marks: boolean[][];
  private score: number | null = null;

  constructor(public values: Immutable<number[][]>) {
    this.marks = map2d(values, () => false);
    this.valueCoords = new Map(
      map2d(values, (value, r, c) => [value, [r, c]] as const).flat(),
    );
  }

  private calculateScore(mostRecentMark: number) {
    const unmarkedValues = map2d(this.marks, (marked, r, c) =>
      marked ? 0 : this.values[r][c],
    ).flat();

    this.score = mostRecentMark * sum(unmarkedValues);
  }

  private checkCompletion(mostRecentMarkCoords: readonly [number, number]) {
    if (this.complete) return;

    const [r, c] = mostRecentMarkCoords;

    this.complete ||=
      this.marks[r].every(Boolean) || this.marks.every((row) => row[c]);

    if (this.complete) {
      this.calculateScore(this.values[r][c]);
    }
  }

  public get isComplete() {
    return this.complete;
  }

  public getScore() {
    if (this.score == null) throw new Error('Cannot score an incomplete board');

    return this.score;
  }

  public mark(value: number): boolean {
    const coords = this.valueCoords.get(value);

    if (coords) {
      const [r, c] = coords;

      this.marks[r][c] = true;

      this.checkCompletion(coords);

      return true;
    }

    return false;
  }

  public log() {
    const spaces = map2d(this.values, (value, r, c) => {
      const marked = this.marks[r][c];
      const valueString = value.toString().padStart(2, ' ');

      return marked ? chalk.yellow(valueString) : chalk.gray(valueString);
    });

    // eslint-disable-next-line no-console
    console.log(spaces.map((row) => row.join(' ')).join('\n'));
  }
}
