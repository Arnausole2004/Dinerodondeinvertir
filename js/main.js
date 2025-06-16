document.getElementById('btn-result').addEventListener('click', showResult);

function showResult() {
  const answers = {
    q1: document.querySelector('input[name="q1"]:checked')?.value,
    q2: document.querySelector('input[name="q2"]:checked')?.value,
    q3: document.querySelector('input[name="q3"]:checked')?.value,
    q4: document.querySelector('input[name="q4"]:checked')?.value,
    q5: document.querySelector('input[name="q5"]:checked')?.value
  };

  if (Object.values(answers).includes(undefined)) {
    alert("Por favor, responde todas las preguntas.");
    return;
  }

  let result = "";
  let link = "";

  if (answers.q1 === "bajo" && answers.q2 === "corto") {
    result = "Renta fija o depósitos bancarios. Baja volatilidad, alta seguridad.";
    link = "fija.html";
  } else if (answers.q1 === "alto" && answers.q2 === "largo") {
    result = "Fondos indexados o acciones. Ideal para crecimiento a largo plazo.";
    link = "fondos.html";
  } else if (answers.q3 === "no" && answers.q5 === "simple") {
    result = "ETFs o fondos gestionados. Facilidad y diversificación.";
    link = "fondos.html";
  } else {
    result = "Diversifica en fondos indexados y bonos corporativos para equilibrar riesgo y rendimiento.";
    link = "fondos.html";
  }

  const resultBox = document.getElementById("result-box");
  const resultText = document.getElementById("result-text");
  const resultLink = document.getElementById("result-link");

  resultText.textContent = result;
  resultLink.href = link;
  resultBox.style.display = "block";
  resultBox.focus();
}

// Animación canvas puntos y líneas

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let width, height;

function resizeCanvas() {
  width = canvas.width = canvas.clientWidth;
  height = canvas.height = canvas.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const POINTS_COUNT = 40;
const points = [];

class Point {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(76,175,80,0.7)';
    ctx.fill();
  }
}

for (let i = 0; i < POINTS_COUNT; i++) {
  points.push(new Point());
}

function drawLines() {
  for (let i = 0; i < POINTS_COUNT; i++) {
    for (let j = i + 1; j < POINTS_COUNT; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = `rgba(76,175,80,${1 - dist / 120})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  points.forEach(p => {
    p.update();
    p.draw();
  });
  drawLines();
  requestAnimationFrame(animate);
}
animate();

// Inicializar AOS
AOS.init({
  duration: 900,
  easing: 'ease-out-cubic',
  once: true,
});

