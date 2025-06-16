// main.js


// Ejemplo: animación simple de puntos conectados en el canvas del header
const canvas = document.querySelector('#network');
const ctx = canvas.getContext('2d');

let width, height;
let points = [];
const POINT_COUNT = 50;
const MAX_DISTANCE = 120;

function resize() {
  width = canvas.width = canvas.clientWidth;
  height = canvas.height = canvas.clientHeight;
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createPoints() {
  points = [];
  for (let i = 0; i < POINT_COUNT; i++) {
    points.push({
      x: random(0, width),
      y: random(0, height),
      vx: random(-0.5, 0.5),
      vy: random(-0.5, 0.5),
    });
  }
}

function updatePoints() {
  for (let p of points) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  points.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > width) p.vx = -p.vx;
    if (p.y < 0 || p.y > height) p.vy = -p.vy;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#00b300'; // verde fuerte
    ctx.fill();
  });

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.strokeStyle = 'rgba(0, 179, 0,' + (1 - dist / 100) * 0.6 + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
  resize();
  createPoints();
});

window.addEventListener('load', () => {
  resize();
  createPoints();
  animate();
});
