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
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;

  // Dibuja puntos
  for (let p of points) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Dibuja líneas entre puntos cercanos
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p1 = points[i];
      const p2 = points[j];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

      if (dist < MAX_DISTANCE) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  updatePoints();
  draw();
  requestAnimationFrame(animate);
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
