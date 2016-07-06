import throttle from 'lodash/throttle';
import { load, resize, loop, inputManager } from './engine.js';
import bound from './bound.js';
import ship from './ship.js';
import asteroidPool from './asteroidPool.js';
import particlePool from './particlePool';
import bulletPool from './bulletPool.js';

function input(player) {
  if (inputManager.left) {
    player.rotate -= player.dRotate;
  }

  if (inputManager.right) {
    player.rotate += player.dRotate;
  }

  if (inputManager.up) {
    particlePool.smoke(player);
    player.patch({
      dx: 4,
      dy: 0,
      dAngle: player.rotate
    });
  }
  else {
    player.patch({
      dx: 0,
      dy: 0
    });
  }

  if (inputManager.space) {
    bulletPool.fire(player);
  }
}

function isDistanceCollision(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)) <= a.radius + b.radius;
}

function bulletAndAsteroidCollision(bPool, aPool) {
  bPool.pool.iterate((b) => {
    aPool.pool.iterate((a) => {
      if (isDistanceCollision(a, b)) {
        a.onCollision(b);
        b.onCollision(a);
      }
    });
  });
}

function shipAndAsteroidCollision(s, aPool) {
  aPool.pool.iterate((a) => {
    if (isDistanceCollision(s, a)) {
      s.onCollision(a);
      a.onCollision(s);
    }
  });
}

load(function fn() {
  const { width, height } = bound;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const player = ship({ x: width / 2, y: height / 2 });

  const rstart = throttle(function restart() {
    player.reset();
    player.patch({
      x: bound.width / 2,
      y: bound.height / 2
    });
    asteroidPool.pool.reset();
    particlePool.pool.reset();
    bulletPool.pool.reset();
  }, 1000, { leading: false });

  const rsize = function rsz() {
    canvas.width = width;
    canvas.height = height;
  };

  rsize();
  resize(rsize);

  loop(function l() {
    const alpha = Math.random() > 0.5 ? 0.8 : 0.4;
    ctx.fillStyle = `rgba(25,0,27,${alpha})`;
    ctx.fillRect(0, 0, bound.width, bound.height);
    if (player.idle) {
      rstart();
    }
    else {
      input(player);
      bulletAndAsteroidCollision(bulletPool, asteroidPool);
      shipAndAsteroidCollision(player, asteroidPool);
    }
    player.frame(ctx);
    asteroidPool.frame(ctx);
    particlePool.frame(ctx);
    bulletPool.frame(ctx);
  });
});
