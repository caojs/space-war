import { doublePI, toRad, randomInRange } from './math.js';
import bound from './bound.js';
import asteroid from './asteroid.js';
import pool from './pool.js';

export const asteroidPool = pool(asteroid, 10).init((as) => {
  as.zefault({
    dx: randomInRange(0.5, 1),
    dy: randomInRange(0.5, 1),
    dAngle: randomInRange(0, doublePI),
    dRotate: toRad(randomInRange(0, 1))
  });
  return as;
});

export default {
  pool: asteroidPool,

  frame(ctx) {
    if (this.pool.activeLength() < 5) {
      const a = this.pool.pop();
      if (a) {
        a.x = Math.random() > 0.5 ? 0 : bound.width;
        a.y = Math.random() > 0.5 ? 0 : bound.height;
      }
    }

    this.pool.iterate((a, i) => {
      if (a.isRelease()) {
        a.reset();
        this.pool.release(a, i);
        return;
      }

      a.frame(ctx);
    });
  }
};
