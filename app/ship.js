import { toRad } from './math.js';
import bound from './bound.js';
import bone from './bone.js';
import particlePool from './particlePool.js';

const proto = {
  onCollision() {
    if (!this.idle) {
      particlePool.explosion(this, 18);
      this.idle = true;
    }
  },

  outBound() {
    const bounder = bound.padding(25);
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

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.outBound();
  },

  draw(ctx) {
    if (this.idle) { return; }
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotate);
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(-15, 10);
    ctx.lineTo(-15, -10);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
};

export default bone(proto, {
  radius: 12,
  rotate: 0,
  dRotate: toRad(8),
  idle: false
});
