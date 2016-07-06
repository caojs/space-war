import identity from 'lodash/identity';
import forEachRight from 'lodash/forEachRight';

const proto = {
  init(fn = identity) {
    for (let i = 0; i < this._length; i++) {
      const element = fn(this._type());
      this._pool.push(element);
    }

    return this;
  },

  pop() {
    const element = this._pool.pop();
    if (element) {
      this._activeElements.push(element);
      return element;
    }
    return null;
  },

  release(p, i) {
    const index = i || this._activeElements.indexOf(p);
    if (index >= 0) {
      this._activeElements.splice(index, 1);
      this._pool.push(p);
    }
  },

  reset() {
    this.iterate((o, i) => {
      o.reset();
      this.release(o, i);
    });
  },

  activeLength() {
    return this._activeElements.length;
  },

  iterate(fn) {
    forEachRight(this._activeElements, fn);
  },
};

function pool(type, n) {
  const me = Object.create(proto);
  me._type = type;
  me._length = n;
  me._pool = [];
  me._activeElements = [];
  return me;
}

export default pool;
