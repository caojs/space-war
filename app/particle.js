import bone from './bone.js';
import { doublePI } from './math.js';

const proto = {
  isRelease() {
    return this.lifetime <= 0;
  },

  update() {
    this.lifetime--;
    this.x += this.dx;
    this.y += this.dy;

    this.radius += this.dRadius;
    if (this.radius <= 0) this.radius = 0.1;
  },

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, doublePI);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
};

const dft = {
  lifetime: 40,
  radius: 3,
  dRadius: -0.2,
  dSpeed: -0.1,
  strokeStyle: 'white',
  lineWidth: 1
};

export default bone(proto, dft);
