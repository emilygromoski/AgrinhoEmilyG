let cenario = 1;
let homemX = 50;
let milhoColetado = 0;
let tratorX = -200;
let nuvens = [];
let jogoPausado = false;

function setup() {
  createCanvas(800, 400);
  for (let i = 0; i < 5; i++) {
    nuvens.push(createVector(random(width), random(50)));
  }
}

function draw() {
  if (jogoPausado) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("FIM DO JOGO", width / 2, height / 2);
    noLoop(); // Pausa o jogo
    return;
  }

  background(135, 206, 250); // Céu azul
  desenharSol();
  moverNuvens();
  desenharNuvens();

  if (cenario === 1) {
    cena1();
  } else if (cenario === 2) {
    cena2();
  }
}

// 🌞 Elementos comuns
function desenharSol() {
  fill(255, 204, 0);
  ellipse(width - 50, 50, 60, 60);
}

function moverNuvens() {
  for (let n of nuvens) {
    n.x += 0.5;
    if (n.x > width) n.x = -50;
  }
}

function desenharNuvens() {
  fill(255);
  noStroke();
  for (let n of nuvens) {
    ellipse(n.x, n.y, 50, 30);
    ellipse(n.x + 20, n.y + 10, 40, 25);
    ellipse(n.x - 20, n.y + 10, 40, 25);
  }
}

function desenharChao() {
  fill(139, 69, 19); // Marrom
  rect(0, height - 50, width, 50);
}

// 🌽 Cena 1: homem colhendo milho
function cena1() {
  desenharChao();
  desenharMilhos();
  desenharHomem(homemX, height - 100);
  moverHomem();

  if (milhoColetado >= 5) {
    cenario = 2;
  }
}

function desenharMilhos() {
  for (let i = 0; i < 5; i++) {
    fill(255, 223, 0);
    rect(150 + i * 60, height - 80, 10, 30);
    fill(34, 139, 34);
    triangle(150 + i * 60 - 5, height - 80,
             150 + i * 60 + 15, height - 80,
             150 + i * 60 + 5, height - 100);
  }
}

function desenharHomem(x, y) {
  fill(255, 0, 0); // Camiseta vermelha
  rect(x, y, 20, 30);
  fill(0, 0, 255); // Calça jeans
  rect(x, y + 30, 20, 20);
  fill(0); // Sapatos pretos
  rect(x, y + 50, 20, 5);
  fill(210, 180, 140); // Chapéu
  ellipse(x + 10, y - 10, 30, 10);
  rect(x + 5, y - 20, 10, 10);
  fill(169); // Saco cinza
  rect(x + 25, y + 20, 15, 25);
}

function moverHomem() {
  homemX += 1;
  if (homemX > 400 && milhoColetado < 5) {
    milhoColetado++;
    homemX = 50;
  }
}

// 🚜 Cena 2: trator com carretinha
function cena2() {
  desenharChao();
  desenharEstrada();
  desenharArvores();
  desenharTrator(tratorX, height - 90);

  tratorX += 2;
  if (tratorX > width + 100) {
    jogoPausado = true;
  }
}

function desenharEstrada() {
  fill(105, 105, 105); // Cinza escuro
  rect(0, height - 70, width, 20);
}

function desenharArvores() {
  for (let i = 0; i < 4; i++) {
    fill(139, 69, 19); // Tronco
    rect(100 + i * 150, height - 120, 20, 50);
    fill(34, 139, 34); // Folhas
    ellipse(110 + i * 150, height - 130, 50, 50);
  }
}

function desenharTrator(x, y) {
  // Carretinha
  fill(200, 0, 0);
  rect(x - 70, y + 10, 50, 20);
  fill(169); // Sacos cinza
  for (let i = 0; i < 3; i++) {
    rect(x - 65 + i * 15, y + 5, 10, 10);
  }

  // Trator
  fill(200, 0, 0);
  rect(x, y, 60, 30);
  fill(0); // Vidros pretos
  rect(x + 5, y - 20, 30, 20);
  rect(x + 10, y - 25, 20, 5);
  fill(255, 255, 0); // Faróis amarelos
  ellipse(x + 55, y + 5, 10, 10);
}

