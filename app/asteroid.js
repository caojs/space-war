import { toRad } from './math.js';
import bone from './bone.js';
import vec2d from './vec2d.js';
import bound from './bound.js';
import particlePool from './particlePool.js';
import { asteroidPool } from './asteroidPool.js';

const proto = {
  isRelease() {
    return this.release;
  },

  destroy() {
    this.release = true;
    if (this.radius > 20) {
      for (let i = 2; i > 0; i--) {
        const p = asteroidPool.pop();
        if (p) {
          p.patch({
            x: this.x,
            y: this.y,
            radius: this.radius / 2,
            lineWidth: this.lineWidth / 2
          });
        }
      }
    }
  },

  onCollision() {
    particlePool.explosion(this, 15, '#E57A44');
    this.destroy();
  },

  onBound() {
    const bounder = bound.padding(this.radius);

    if (this.x > bounder.maxX) {
      this.x = bounder.minX;
    }
    else if (this.x < bounder.minX) {
      this.x = bounder.maxX;
    }

    if (this.y > bounder.maxY) {
      this.y = bounder.minY;
    }
    else if (this.y < bounder.minY) {
      this.y = bounder.maxY;
    }
  },

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotate);
    ctx.strokeStyle = '#E57A44';
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();

    const vec = vec2d(this.radius, 0);
    ctx.moveTo(vec.getX(), vec.getY());
    for (let angle = 60; angle < 360; angle += 60) {
      vec.setRadian(toRad(angle));
      ctx.lineTo(vec.getX(), vec.getY());
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  },

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.rotate += this.dRotate;
    this.onBound();
  },
};

const dft = {
  radius: 70,
  release: false,
  lineWidth: 5,
};

export default bone(proto, dft);
