import throttle from 'lodash/throttle';
import { PI, toRad, randomInRange } from './math';
import vec2d from './vec2d';
import pool from './pool.js';
import particle from './particle.js';

const particlePool = pool(particle, 60).init();

export default {
  pool: particlePool,

  explosion(ob, n, color) {
    const { x, y, radius } = ob;
    const step = 360 / n;
    let start = 0;
    for (let i = n; i > 0; i--) {
      const p = particlePool.pop();
      if (p) {
        const rd = randomInRange(0.1, radius / 4);
        const dAngle = randomInRange(toRad(start - 10), toRad(start + 10));
        const vec = vec2d(
          randomInRange(radius - 1, radius + 1), 0,
          dAngle
        );
        start += step;
        p.patch({
          x: x + vec.getX(),
          y: y + vec.getY(),
          radius: rd,
          dx: randomInRange(1, 4),
          dy: 0,
          dAngle: dAngle,
          dRadius: -rd / 30,
          strokeStyle: color || 'white'
        });
      }
    }
  },

  smoke: throttle((ob) => {
    const { x, y, rotate } = ob;
    const p = particlePool.pop();
    if (p) {
      p.patch({
        x: x,
        y: y,
        dx: randomInRange(2, 6),
        dy: 0,
        dAngle: PI + randomInRange(rotate - toRad(10), rotate + toRad(10))
      });
    }
  }, 50),

  frame(ctx) {
    particlePool.iterate((p, i) => {
      if (p.isRelease()) {
        p.reset();
        particlePool.release(p, i);
        return;
      }
      p.frame(ctx);
    });
  }
};
