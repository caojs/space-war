import throttle from 'lodash/throttle';
import bullet from './bullet.js';
import pool from './pool';

const bulletPool = pool(bullet, 20).init();

export default {
  pool: bulletPool,

  fire: throttle((ob) => {
    const { x, y, rotate } = ob;
    const p = bulletPool.pop();
    if (p) {
      p.patch({
        x: x,
        y: y,
        dAngle: rotate,
        release: false
      });
    }
  }, 200, { trailing: false }),

  frame(ctx) {
    bulletPool.iterate((b, i) => {
      if (b.isRelease()) {
        b.reset();
        bulletPool.release(b, i);
        return;
      }

      b.frame(ctx);
    });
  }
};
