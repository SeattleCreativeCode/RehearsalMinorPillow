let buffer = 150;
let inside = 75;
let size = 600
let degree = 4;
let rowBlankChance = 0.1;
let dotBlankChance = 0.4;
let seed = 0;
let fps = 60;
let speed = 1;
let cycleStart = 0;
function setup() {
  createCanvas(size, size);
  frameRate(fps);
  angleMode(DEGREES);
  seed = Math.ceil(random(0, 99999));
  textAlign(CENTER);
  textFont('Courier New');
  textSize(14);
  textStyle(BOLD);
}

function draw() {
  randomSeed(seed);
  speed = map(randomGaussian(), -1, 1, 10, 200);

  background(51);
  translate(width/2, height/2);
  noStroke();
  fill('#ffd')
  text("" + seed, 0, 0);
  for(let i=0; i<360/degree; i++) {
    // for(let i=0; i < 1; i++) {
    if (Math.abs(randomGaussian()) > rowBlankChance) {
      for(let o=inside; o<(width/2) - buffer; o+=8) {
        if (Math.abs(randomGaussian()) > dotBlankChance) {
          let time = (frameCount - cycleStart);
          let alpha = map(randomGaussian(), -1, 1, 128, 255);
          let c = lerpColor(color('#ffd'), color('#fdf'), tan(time / o * speed));
          c.setAlpha(alpha);
          fill(c);
          let offset = constrain(tan(speed / o * time) * 5, -(size / 2 -buffer), (size / 2 - buffer));
          circle(o, offset, 6);
        }
      }
    }
    rotate(degree);
  }
}

function mouseReleased(e) {
  if (e.button == 0) {
    seed = Math.ceil(random(0, 99999));
    cycleStart = frameCount;
  }
}