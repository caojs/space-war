import { load, resize } from './engine.js';

const bound = Object.create({
  inBound({ x, y }, { minX, maxX, minY, maxY }) {
    return x >= minX &&
      x <= maxX &&
      y >= minY &&
      y <= maxY;
  },

  outBound({ x, y }, { minX, maxX, minY, maxY }) {
    return x <= minX ||
      x >= maxX ||
      y <= minY ||
      y >= maxY;
  },

  padding(p) {
    return {
      minX: -p,
      maxX: this.width + p,
      minY: -p,
      maxY: this.height + p
    };
  }
});

function screenSize() {
  bound.width = window.innerWidth;
  bound.height = window.innerHeight;
}

load(screenSize);
resize(screenSize);

export default bound;
