const PI = Math.PI;
const doublePI = Math.PI * 2;
const halfPI = Math.PI / 2;

function toRad(d) {
  return PI / 180 * d;
}

function randomInRange(min, max, round) {
  const ran = Math.random() * (max - min) + min;
  return round ? Math.round(ran) : ran;
}

export {
  PI,
  doublePI,
  halfPI,
  toRad,
  randomInRange
};
