let colors = ["#F43B1F", "#785137", "#395CA0", "#477150", "#635A55"];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0)
  canvas.style('z-index', '-1')
  canvas.style('opacity', '0')

  generate();

  setTimeout(() => {
    canvas.style('transition', 'opacity 3s'); // Adjust the transition duration as needed
    canvas.style('opacity', '0.15');
  }, 100);
}

function draw() {}

function generate() {
  background(15);
  for (let i = 0; i < 300; i++) {
    let rnd = int(random(2));
    rnd = 0;
    let x = random(-0.1, 1.1) * width;
    let y = random(-0.1, 1.1) * height;
    shuffle(colors, true);
    noiseCurve(x, y);
  }
}

function noiseCurve(x, y) {
  let c = int(random(50, 250));
  let nr = random(100000);
  let w = random(20, 100);
  let crm = random(0.1) * random(random());

  for (let i = 0; i < c; i++) {
    let scl = 0.0002;
    let nStr = noise(x / 12345, y / 12345) * 70;
    let ang = noise(x * scl, y * scl, (i + 100) * 0.0001) * nStr;
    let at = atan2((y + sin(ang)) - y, (x + cos(ang)) - x);
    let ww = (noise(nr, x * 0.0005, y * 0.0005) - 0.5) * w;
    stroke(getColor(i * crm));
    line(x + (ww * cos(at + HALF_PI)), y + (ww * sin(at + HALF_PI)), x + (ww * cos(at - HALF_PI)), y + (ww * sin(at - HALF_PI)));
    x += cos(ang) * 2;
    y += sin(ang) * 2;
  }

}

function getColor(t) {
  t = t % (colors.length);
  let col1 = color(colors[int(t % colors.length)]);
  let col2 = color(colors[int((t + 1) % colors.length)]);
  return lerpColor(col1, col2, t % 1);
}