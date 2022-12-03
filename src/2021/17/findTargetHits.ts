import { inverseTriangleNumber, triangleNumber } from '~/util/triangleNumber';
import { TargetArea } from './parse';

type Vector = Pick<SimState, 'x' | 'y'>;

export const findTargetHits = (target: TargetArea) => {
  // Some of this code assumes that the target is in quadrant 4.
  if (target.x[0] <= 0)
    throw new Error('Non-positive X value for target area not implemented');
  if (target.y[0] >= 0)
    throw new Error('Non-negative Y value for target area not implemented');

  const isValueInTarget = (value: number, axis: 'x' | 'y') =>
    value >= target[axis][0] && value <= target[axis][1];

  const touchesTarget = (position: Vector) => {
    const { x, y } = position;

    return isValueInTarget(x, 'x') && isValueInTarget(y, 'y');
  };

  // Any X velocity less than this will succumb to drag before reaching the
  // target area.
  const minVx0 = calculateMinX(target);
  // Any X velocity greater than this will overshoot the target area immediately.
  const maxVx0 = target.x[1];
  // Any Y velocity below this will undershoot the target area.
  const minVy0 = target.y[0];
  // Because the probe will always touch the x-axis on the way back down with
  // vy = -vy0, any Y velocity greater than this will skip over the target
  // immediately after crossing the x-axis.
  const maxVy0 = Math.abs(target.y[0]);

  const hits: Vector[] = [];

  for (let vx0 = minVx0; vx0 <= maxVx0; vx0++) {
    for (let vy0 = minVy0; vy0 <= maxVy0; vy0++) {
      let state = xIntercept(vx0, vy0);
      const sim = simulate(state);

      while (state.y > target.y[0]) {
        state = sim.next().value;

        if (touchesTarget(state)) {
          hits.push({ x: vx0, y: vy0 });
          break;
        }

        // Once vx has eroded to 0, if it's out of the target bounds, it will
        // never enter the target bounds.
        if (state.vx === 0 && !isValueInTarget(state.x, 'x')) {
          break;
        }
      }
    }
  }

  return hits;
};

const calculateMinX = (target: TargetArea) => {
  const x0 = target.x[0];
  // The total X distance travelled is equal to the nth triangle
  // number where n is the initial x velocity.
  const invTri = inverseTriangleNumber(x0);

  // If x0 happened to exactly be a triangle number, the inverse value is valid,
  // otherwise the inverse value is less than x0 and the next triangle number is
  // the first to reach the target.
  return x0 === triangleNumber(invTri) ? invTri : invTri + 1;
};

interface SimState {
  x: number;
  y: number;
  vy: number;
  vx: number;
}

const xIntercept = (vx0: number, vy0: number): SimState => {
  // For a given initial Y velocity vy0 , peak Y is attained after vy0 steps.
  // The probe will stay at the apex for a total of 2 steps.
  // It will hit the origin after another vy0 steps.
  // Therefore, after (k = 2* vy0 + 1) steps, the probe is at the x-axis (y=0).
  const k = 2 * vy0 + 1;

  const vx = Math.max(0, vx0 - k);
  const vy = vy0 - k;

  const x = triangleNumber(vx0) - triangleNumber(vx);
  const y = 0;

  return { x, y, vx, vy };
};

function* simulate(initialState: SimState): Generator<SimState, SimState> {
  let { x, y, vx, vy } = initialState;

  while (true) {
    x += vx;
    y += vy;

    vx = Math.max(0, vx - 1);
    vy--;

    yield { x, y, vx, vy };
  }
}
