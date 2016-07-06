const proto = {
  getX() {
    return this._x;
  },

  getY() {
    return this._y;
  },

  getRadian() {
    return Math.atan2(this.getY(), this.getX());
  },

  getLength() {
    const x = this.getX();
    const y = this.getY();
    return Math.sqrt(y * y + x * x);
  },

  add(vec) {
    this._x += vec.getX();
    this._y += vec.getY();
    return this;
  },

  sub(vec) {
    this._x -= vec.getX();
    this._y -= vec.getY();
    return this;
  },

  mul(n) {
    this._x *= n;
    this._y *= n;
    return this;
  },

  div(n) {
    this._x /= n;
    this._y /= n;
    return this;
  },

  setX(x) {
    this._x = x;
    return this;
  },

  setY(y) {
    this._y = y;
    return this;
  },

  setXY(x, y) {
    this._x = x;
    this._y = y;
    return this;
  },

  setLength(length) {
    const r = this.getRadian();
    this.setX(Math.cos(r) * length);
    this.setY(Math.sin(r) * length);
    return this;
  },

  addLength(n) {
    const length = this.getLength() + n;
    this.setLength(length > 0 ? length : 0);
    return this;
  },

  setRadian(r) {
    const length = this.getLength();
    this.setX(Math.cos(r) * length);
    this.setY(Math.sin(r) * length);
    return this;
  }
};

function vec2d(x = 0, y = 0, r = 0) {
  const me = Object.create(proto);
  me.setXY(x, y)
    .setRadian(r);
  return me;
}

export default vec2d;
