import { toInt } from './toInt';

export type VectorString = `${number},${number}`;

export class Vector {
  static fromString(string: VectorString) {
    const [x, y] = string.split(',').map(toInt);

    return new Vector(x, y);
  }

  constructor(public readonly x: number, public readonly y: number) {}

  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  scale(factor: number) {
    return new Vector(this.x * factor, this.y * factor);
  }

  rotate(radians: number) {
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);

    const x = cos * this.x - sin * this.y;
    const y = sin * this.x + cos * this.y;

    return new Vector(x, y);
  }

  negate() {
    return this.scale(-1);
  }

  map(iteree: (value: number) => number) {
    return new Vector(iteree(this.x), iteree(this.y));
  }

  rounded() {
    return this.map(Math.round);
  }

  equals(other: Vector) {
    return this.x === other.x && this.y === other.y;
  }

  add(other: Vector) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  subtract(other: Vector) {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  dotProduct(other: Vector) {
    return this.x * other.x + this.y * other.y;
  }

  angleBetween(other: Vector) {
    return Math.acos(
      this.dotProduct(other) / (this.magnitude() * other.magnitude()),
    );
  }

  angleTo(other: Vector) {
    // https://stackoverflow.com/a/21484228
    const angle = Math.atan2(other.y, other.x) - Math.atan2(this.y, this.x);

    // normalize to `[0, 2π)`
    return angle < 0 ? angle + 2 * Math.PI : angle;
  }

  toString(): VectorString {
    return `${this.x},${this.y}`;
  }
}

export const vec = (x: number, y: number) => new Vector(x, y);
