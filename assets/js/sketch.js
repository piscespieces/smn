let lights = [];
let n = 0;
let c = 0;
let time = 1;

// Define your color array
let colors = ["#F43B1F", "#785137", "#395CA0", "#477150", "#635A55"];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0)
  canvas.style('z-index', '-1')
  canvas.style('opacity', '0.15')

  background(0);
  frameRate(80);

  for (let i = 0; i < 60; ++i) {
    let arr = [];
    for (let j = 0; j < 600; ++j) {
      arr.push(new light());
    }
    lights.push(arr);
  }

  let vel0 = 4;
  for (let i = 0; i < 60; i++) {
    let vel = createVector(0, 0, 0);
    let theta = i * 2 * PI / 60;
    vel.x = vel0 * cos(theta);
    vel.y = vel0 * sin(theta);
    for (let j = 0; j < 600; j++) {
      lights[i][j] = new light(createVector(width / 2, height / 2, 0), vel);
    }
  }
  mouseX = width / 2;
  mouseY = height / 2;
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 20);
  n = 50 + time % 200;

  let o = int(time) % 300;
  let co = int(constrain(map(mouseY, 0, height, 0, 255), 0, 255));

  let currentColor = interpolateColor(time * 0.01);

  fill(currentColor);

  let xxx = int(constrain(map(mouseX, 0, width, 0, 60), 0, 60));
  for (let i = 0; i < xxx; i += 1) {
    for (let j = 0 + o; j < n + o; j++) {
      lights[i][j].run(currentColor);
    }
  }

  time++;
}

function interpolateColor(t) {
  let c1 = color(colors[floor(t) % colors.length]);
  let c2 = color(colors[(floor(t) + 1) % colors.length]);
  let amt = t % 1;
  return lerpColor(c1, c2, amt);
}

class light {
  constructor(_pos = createVector(0, 0, 0), _vel = createVector(0, 0, 0)) {
    this.pos = _pos;
    this.vel = _vel;
    this.acc = createVector(0, 0, 0);
    this.r = 5;
  }

  run(currentColor) {
    if (this.pos.x < 0) this.vel.x = -this.vel.x;
    if (this.pos.x > width) this.vel.x = -this.vel.x;
    if (this.pos.y < 0) this.vel.y = -this.vel.y;
    if (this.pos.y > height) this.vel.y = -this.vel.y;
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    fill(currentColor);
    noStroke();
    rect(this.pos.x, this.pos.y, this.r, this.r);
  }
}
