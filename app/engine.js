const getAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function frame(callback) {
    window.setTimeout(callback, 16.6);
  };

const inputManager = {
  left: false,
  right: false,
  up: false,
  down: false,
  space: false
};

const resizers = [];
const loaders = [];

function load(fn) {
  if (typeof fn === 'function') {
    loaders.push(fn);
  }
}

function loop(fn) {
  getAnimationFrame(() => {
    fn();
    loop(fn);
  });
}

function resize(fn) {
  if (typeof fn === 'function') {
    resizers.push(fn);
  }
}

window.onkeydown = function keydown(e) {
  e.preventDefault();

  switch (e.keyCode) {
  case 37:
    inputManager.left = true;
    break;

  case 38:
    inputManager.up = true;
    break;

  case 39:
    inputManager.right = true;
    break;

  case 40:
    inputManager.down = true;
    break;

  case 75:
  case 32:
    inputManager.space = true;
    break;

  default:
    break;
  }
};

window.onkeyup = function keyup(e) {
  e.preventDefault();

  switch (e.keyCode) {
  case 37:
    inputManager.left = false;
    break;

  case 38:
    inputManager.up = false;
    break;

  case 39:
    inputManager.right = false;
    break;

  case 40:
    inputManager.down = false;
    break;

  case 75:
  case 32:
    inputManager.space = false;
    break;

  default:
    break;
  }
};

window.onload = function onload() {
  loaders.forEach((fn) => fn());
};

window.onresize = function rs() {
  resizers.forEach((fn) => fn());
};

export {
  load,
  resize,
  loop,
  inputManager
};
