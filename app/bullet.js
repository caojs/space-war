import bone from './bone.js';
import bound from './bound.js';

const proto = {
  isRelease() {
    return this.release || bound.outBound(
      { x: this.x, y: this.y },
      bound.padding(15)
    );
  },

  onCollision() {
    this.release = true;
  },

  update() {
    this.x += this.dx;
    this.y += this.dy;
  },

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = '#E3D985';
    ctx.lineWidth = 2;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.dAngle);
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(6, 0);
    ctx.stroke();
    ctx.restore();
    return this;
  }
};

const dft = {
  dx: 8,
  dy: 0,
  radius: 6,
  release: false
};

export default bone(proto, dft);
