import vec2d from './vec2d.js';

const dft = {
  x: null,
  y: null,
  dx: 0,
  dy: 0,
  dAngle: 0,
  dSpeed: 0,

  rotate: 0,
  dRotate: 0
};


const proto = {
  patch(modifier) {
    const keys = Object.keys(modifier);
    keys.forEach((k) => {
      if (~this._patchable.indexOf(k)) {
        this[k] = modifier[k];
      }
    });

    if (modifier.dAngle) {
      this._vel
        .setXY(this.dx, this.dy)
        .setRadian(modifier.dAngle);
      this.dx = this._vel.getX();
      this.dy = this._vel.getY();
    }
  },

  zefault(modifier) {
    this.patch(modifier);
    this._dft = Object.assign(
      this._dft,
      this._patchable
        .filter((v) => modifier[v])
        .reduce((m, v) => {
          m[v] = modifier[v];
          return m;
        }, {})
    );
  },

  reset() {
    this.patch(this._dft);
  },

  preUpdate() {
    if (this.dSpeed) {
      this._vel
        .setXY(this.dx, this.dy)
        .addLength(this.dSpeed);
      this.dx = this._vel.getX();
      this.dy = this._vel.getY();
    }
  },

  frame(ctx) {
    this.preUpdate();
    this.update();
    this.draw(ctx);
  }
};

export default function bone(type, options) {
  return function create(p) {
    const me = Object.create(proto);
    me._dft = Object.assign({}, dft, options);
    me._patchable = Object.keys(me._dft);
    me._vel = vec2d(0, 0);
    me.patch(Object.assign({}, me._dft, p));
    return Object.assign(me, type);
  };
}
